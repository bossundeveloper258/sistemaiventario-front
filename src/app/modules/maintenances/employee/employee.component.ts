import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { AreaService } from 'src/app/shared/services/api/area/area.service';
import { CostcenterService } from 'src/app/shared/services/api/costcenter/costcenter.service';
import { EmployeeService } from 'src/app/shared/services/api/employee/employee.service';
import { AreaModel } from 'src/app/shared/services/api/models/area.model';
import { CostCenterModel } from 'src/app/shared/services/api/models/costcenter.model';
import { EmployeeModel } from 'src/app/shared/services/api/models/employee.model';
import { constants } from 'src/app/shared/utility/constants';
import { validForm } from 'src/app/shared/utility/functions';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employeeSet: Array<EmployeeModel> = [];
  isVisible: boolean = false;
  titleModal: string;
  validateForm: FormGroup;
  editFrom: boolean = false;
  areaList: Array<AreaModel> = [];
  costCenterList: Array<CostCenterModel> = [];

  constant = constants;
  
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private costcenterService: CostcenterService,
    private areaService: AreaService,
  ) {
    this.validateForm = this.fb.group({
      id: [null],
      gpid: [null, [Validators.required, Validators.minLength(8)]],
      name: [null, [ Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      job: [null, [ Validators.required]],
      area_id: [null, [ Validators.required]],
      cost_center_id: [null, [ Validators.required]],
    },
    [ ]);
  }

  ngOnInit(): void {
    this.listEmployees();
    this.loadOptions();
  }

  public onNew(): void{
    this.titleModal = "Nuevo Usuario";
    this.isVisible = true;
    this.validateForm.get("id").setValue(0);
    this.validateForm.patchValue({
      gpid: "",
      name: "",
      email: "",
      job: "",
      area_id: "",
      cost_center_id: null
    });
  }

  public onEdit(bId: number): void{
    this.employeeService.edit(bId).subscribe(
      (res) => {
        this.titleModal = "Editar Usuario";
        this.isVisible = true;
        this.validateForm.patchValue({
          id: res.id,
          gpid: res.gpid,
          name: res.name,
          email: res.email,
          job: res.job,
          area_id: res.area_id,
          cost_center_id: res.cost_center_id
        });
        this.editFrom = true;
      }
    )
  }

  private command(): any{
    return {
      id: this.validateForm.get("id").value,
      gpid: this.validateForm.get("gpid").value,
      name: this.validateForm.get("name").value,
      email: this.validateForm.get("email").value,
      job: this.validateForm.get("job").value,
      area_id: this.validateForm.get("area_id").value,
      cost_center_id: this.validateForm.get("cost_center_id").value
    }
  }

  public handleCancel(): void{
    this.isVisible = false;
  }

  public handleOk(): void{
    if( !validForm(this.validateForm) ){
      let service: Observable<any>;
      if( this.validateForm.get('id').value == 0 ){
        service = this.employeeService.create( this.command() )
      }else{
        service = this.employeeService.update( this.command() , this.validateForm.get('id').value)
      }
      service.subscribe(
        (res) => {
          this.isVisible = false;
          this.listEmployees();
        }
      )
    }
  }

  private listEmployees():void {
    this.employeeService.getAll().subscribe(
      (res) => {
        this.employeeSet = res.data
      }
    )
  }

  private loadOptions(): void{
    forkJoin([
      this.areaService.getAll()
    ]).subscribe(
      (responses) => {
        this.areaList = responses[0].data;
      }
    )
  }

  public onChangeArea(ev: any):void {
    this.costcenterService.search( this.validateForm.get('area_id').value ).subscribe(
      (res) => {
        this.costCenterList = res.data;
      }
    )
  }

  public onChangeStatus(status: any ,  id: number):void {
    this.employeeService.updateStatus( { status } , id).subscribe(
      (res) => {}
    )
  }

}
