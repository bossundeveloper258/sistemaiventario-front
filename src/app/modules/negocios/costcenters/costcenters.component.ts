import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { AreaService } from 'src/app/shared/services/api/area/area.service';
import { BusinessService } from 'src/app/shared/services/api/business/business.service';
import { CostcenterService } from 'src/app/shared/services/api/costcenter/costcenter.service';
import { AreaModel } from 'src/app/shared/services/api/models/area.model';
import { BusinessModel } from 'src/app/shared/services/api/models/business.model';
import { CostCenterModel } from 'src/app/shared/services/api/models/costcenter.model';
import { SedeModel } from 'src/app/shared/services/api/models/sede.model';
import { SedeService } from 'src/app/shared/services/api/sede/sede.service';
import { constants } from 'src/app/shared/utility/constants';
import { validForm } from 'src/app/shared/utility/functions';

@Component({
  selector: 'app-costcenters',
  templateUrl: './costcenters.component.html',
  styleUrls: ['./costcenters.component.css']
})
export class CostcentersComponent implements OnInit {

  costCenterSet: Array<CostCenterModel> = []; 
  sedeList: Array<SedeModel> = [];
  isVisible: boolean = false;
  titleModal: string;
  validateForm: FormGroup;
  editFrom: boolean = false;
  sedeTypes: Array<any> = [];
  businessList: Array<BusinessModel> = [];
  areaList: Array<AreaModel> = [];
  constant = constants;
  
  constructor(
    private fb: FormBuilder,
    private businessService: BusinessService,
    private sedeService: SedeService,
    private areaService: AreaService,
    private costcenterService: CostcenterService
  ) {
    this.validateForm = this.fb.group({
      id: [null],
      name: [null, [ Validators.required]],
      code: [null, [ Validators.required]],
      sede_id: [null, [Validators.required]],
      business_id: [null, [Validators.required]],
      area_id: [null, [Validators.required]]
    },
    [ ]);
  }

  ngOnInit(): void {
    this.listCostCenter();
    this.loadOptions();
  }

  public onNew(): void{
    this.titleModal = "Nuevo Area";
    this.isVisible = true;
    this.validateForm.get("id").setValue(0);
    this.validateForm.patchValue({
      name: "",
      code: "",
      address: "",
      sede_id: null,
      business_id: null,
      area_id: null
    });

  }

  public onEdit(bId: number): void{
    this.costcenterService.edit(bId).subscribe(
      (res) => {
        this.titleModal = "Editar Area";
        this.isVisible = true;
        this.validateForm.patchValue({
          id: res.id,
          code: res.code,
          name: res.name,
          sede_id: res.sede_id,
          // business_id: res.business_id,
          area_id: res.area_id
        });
        this.validateForm.get('business_id').setValue(res.business_id);
        this.onChangeBusiness(res.business_id);
        this.onChangeSede(res.sede_id);
        this.editFrom = true;
      }
    )
  }

  private command(): any{
    return {
      id: this.validateForm.get("id").value,
      code: this.validateForm.get("code").value,
      name: this.validateForm.get("name").value,
      sede_id: this.validateForm.get("sede_id").value,
      business_id: this.validateForm.get("business_id").value,
      area_id: this.validateForm.get("area_id").value,
    }
  }

  public handleCancel(): void{
    this.isVisible = false;
  }

  public handleOk(): void{
    if( !validForm(this.validateForm) ){
      let service: Observable<any>;
      if( this.validateForm.get('id').value == 0 ){
        service = this.costcenterService.create( this.command() )
      }else{
        service = this.costcenterService.update( this.command() , this.validateForm.get('id').value)
      }
      service.subscribe(
        (res) => {
          this.isVisible = false;
          this.listCostCenter();
        }
      )
    }
  }

  private listCostCenter():void {
    this.costcenterService.getAll().subscribe(
      (res) => {
        this.costCenterSet = res.data
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
    this.sedeService.search( this.validateForm.get('business_id').value ).subscribe(
      (res) => {
        this.sedeList = res.data;
      }
    )
  }

  public onChangeSede(ev: any): void{
    this.areaService.search( this.validateForm.get('sede_id').value ).subscribe(
      (res) => {
        this.areaList = res.data;
      }
    )
  }

}
