import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { BusinessService } from 'src/app/shared/services/api/business/business.service';
import { BusinessModel } from 'src/app/shared/services/api/models/business.model';
import { SedeModel } from 'src/app/shared/services/api/models/sede.model';
import { ParametersService } from 'src/app/shared/services/api/parameters.service';
import { SedeService } from 'src/app/shared/services/api/sede/sede.service';
import { constants } from 'src/app/shared/utility/constants';
import { validForm } from 'src/app/shared/utility/functions';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.css']
})
export class SedeComponent implements OnInit {

  sedeSet: Array<SedeModel> = [];
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
    private parametersService: ParametersService
  ) {
    this.validateForm = this.fb.group({
      id: [null],
      serie: [{ value: null, disabled: true }],
      name: [null, [ Validators.required]],
      address: [null, [Validators.required]],
      sede_type: [null, [Validators.required]],
      business_id: [null, [Validators.required]],
    },
    [ ]);
  }

  ngOnInit(): void {
    this.listBusiness();
    this.loadOptions();
  }

  public onNew(): void{
    this.titleModal = "Nuevo Empresa";
    this.isVisible = true;
    this.validateForm.get("id").setValue(0);
    this.validateForm.patchValue({
      name: "",
      address: "",
      sede_type: null,
      business_id: null
    });

  }

  public onEdit(bId: number): void{
    this.sedeService.edit(bId).subscribe(
      (res) => {
        this.titleModal = "Editar Empresa";
        this.isVisible = true;
        this.validateForm.patchValue({
          id: res.id,
          serie: res.serie + '0000' + res.id,
          name: res.name,
          address: res.address,
          sede_type: res.sede_type_id,
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
      address: this.validateForm.get("address").value,
      sede_type: this.validateForm.get("sede_type").value,
      business_id: this.validateForm.get("business_id").value,
    }
  }

  public handleCancel(): void{
    this.isVisible = false;
  }

  public handleOk(): void{
    if( !validForm(this.validateForm) ){
      let service: Observable<any>;
      if( this.validateForm.get('id').value == 0 ){
        service = this.sedeService.create( this.command() )
      }else{
        service = this.sedeService.update( this.command() , this.validateForm.get('id').value)
      }
      service.subscribe(
        (res) => {
          this.isVisible = false;
          this.listBusiness();
        }
      )
    }
  }

  private listBusiness():void {
    this.sedeService.getAll().subscribe(
      (res) => {
        this.sedeSet = res.data
      }
    )
  }

  private loadOptions(): void{
    forkJoin([
      this.parametersService.search(2),
      this.businessService.search()
    ]).subscribe(
      (responses) => {

        this.sedeTypes = responses[0].data;
        this.businessList = responses[1].data;
      }
    )
  }

  public onChangeStatus(status: any ,  id: number):void {
    this.sedeService.updateStatus( { status } , id).subscribe(
      (res) => {}
    )
  }

}
