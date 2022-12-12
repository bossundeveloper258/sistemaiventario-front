import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { AreaService } from 'src/app/shared/services/api/area/area.service';
import { BusinessService } from 'src/app/shared/services/api/business/business.service';
import { AreaModel } from 'src/app/shared/services/api/models/area.model';
import { BusinessModel } from 'src/app/shared/services/api/models/business.model';
import { SedeModel } from 'src/app/shared/services/api/models/sede.model';
import { SedeService } from 'src/app/shared/services/api/sede/sede.service';
import { constants } from 'src/app/shared/utility/constants';
import { validForm } from 'src/app/shared/utility/functions';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  areaSet: Array<AreaModel> = []; 
  sedeList: Array<SedeModel> = [];
  isVisible: boolean = false;
  titleModal: string;
  validateForm: FormGroup;
  editFrom: boolean = false;
  sedeTypes: Array<any> = [];
  businessList: Array<BusinessModel> = [];

  constant = constants;
  
  constructor(
    private fb: FormBuilder,
    private businessService: BusinessService,
    private sedeService: SedeService,
    private areaService: AreaService
  ) {
    this.validateForm = this.fb.group({
      id: [null],
      name: [null, [ Validators.required]],
      // sede_id: [null, [Validators.required]],
      business_id: [null, [Validators.required]],
    },
    [ ]);
  }

  ngOnInit(): void {
    this.listAreas();
    this.loadOptions();
  }

  public onNew(): void{
    this.titleModal = "Nuevo Area";
    this.isVisible = true;
    this.validateForm.get("id").setValue(0);
    this.validateForm.patchValue({
      name: "",
      address: "",
      business_id: null
    });

  }

  public onEdit(bId: number): void{
    this.areaService.edit(bId).subscribe(
      (res) => {
        this.titleModal = "Editar Area";
        this.isVisible = true;
        this.validateForm.patchValue({
          id: res.id,
          name: res.name,
          business_id: res.business_id
        });
        this.editFrom = true;
      }
    )
  }

  private command(): any{
    return {
      id: this.validateForm.get("id").value,
      name: this.validateForm.get("name").value,
      business_id: this.validateForm.get("business_id").value,
      sede_id: null
    }
  }

  public handleCancel(): void{
    this.isVisible = false;
  }

  public handleOk(): void{
    if( !validForm(this.validateForm) ){
      let service: Observable<any>;
      if( this.validateForm.get('id').value == 0 ){
        service = this.areaService.create( this.command() )
      }else{
        service = this.areaService.update( this.command() , this.validateForm.get('id').value)
      }
      service.subscribe(
        (res) => {
          this.isVisible = false;
          this.listAreas();
        }
      )
    }
  }

  private listAreas():void {
    this.areaService.getAll().subscribe(
      (res) => {
        this.areaSet = res.data
      }
    )
  }

  private loadOptions(): void{
    forkJoin([
      this.businessService.getAll()
    ]).subscribe(
      (responses) => {
        this.businessList = responses[0].data;
      }
    )
  }

  public onChangeBusiness(ev: any): void {
    this.sedeService.search( this.validateForm.get('business_id').value , 1 ).subscribe(
      (res) => {
        this.sedeList = res.data;
      }
    )
  }

  public onChangeStatus(status: any ,  id: number):void {
    this.areaService.updateStatus( { status } , id).subscribe(
      (res) => {}
    )
  }

}
