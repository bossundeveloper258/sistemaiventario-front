import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BusinessService } from 'src/app/shared/services/api/business/business.service';
import { BusinessModel } from 'src/app/shared/services/api/models/business.model';
import { constants } from 'src/app/shared/utility/constants';
import { validForm } from 'src/app/shared/utility/functions';

@Component({
  selector: 'app-businesses',
  templateUrl: './businesses.component.html',
  styleUrls: ['./businesses.component.css']
})
export class BusinessesComponent implements OnInit {

  businessSet: Array<BusinessModel> = [];
  isVisible: boolean = false;
  titleModal: string;
  validateForm: FormGroup;
  editFrom: boolean = false;

  constant = constants;
  
  constructor(
    private fb: FormBuilder,
    private businessService: BusinessService
  ) {
    this.validateForm = this.fb.group({
      id: [null],
      ruc: [null, [Validators.required, Validators.maxLength(11)]],
      name: [null, [ Validators.required]],
      address: [null, [Validators.required]]
    },
    [ ]);
  }

  ngOnInit(): void {
    this.listBusiness();
  }

  public onNew(): void{
    this.titleModal = "Nuevo Empresa";
    this.isVisible = true;
    this.validateForm.get("id").setValue(0);
    this.validateForm.patchValue({
      ruc: "",
      name: "",
      address: "",
    });
  }

  public onEdit(bId: number): void{
    this.businessService.edit(bId).subscribe(
      (res) => {
        console.log(res);
        this.titleModal = "Editar Empresa";
        this.isVisible = true;
        this.validateForm.patchValue({
          id: res.id,
          ruc: res.ruc,
          name: res.name,
          address: res.address,
        });
        this.editFrom = true;
      }
    )
  }

  private command(): any{
    return {
      id: this.validateForm.get("id").value,
      ruc: this.validateForm.get("ruc").value,
      name: this.validateForm.get("name").value,
      address: this.validateForm.get("address").value
    }
  }

  public handleCancel(): void{
    this.isVisible = false;
  }

  public handleOk(): void{
    if( !validForm(this.validateForm) ){
      let service: Observable<any>;
      if( this.validateForm.get('id').value == 0 ){
        service = this.businessService.create( this.command() )
      }else{
        service = this.businessService.update( this.command() , this.validateForm.get('id').value)
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
    this.businessService.getAll().subscribe(
      (res) => {
        this.businessSet = res.data
      }
    )
  }

  public onChangeStatus(status: any ,  id: number):void {
    this.businessService.updateStatus( { status } , id).subscribe(
      (res) => {}
    )
  }
}
