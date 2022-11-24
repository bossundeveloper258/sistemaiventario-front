import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/shared/services/api/models/user.model';
import { UsersService } from 'src/app/shared/services/api/users.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidatorCustom } from 'src/app/shared/utility/formValidation';
import { validForm } from 'src/app/shared/utility/functions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userSet: Array<UserModel> = [];
  isVisible: boolean = false;
  titleModal: string;
  validateForm: FormGroup;
  editFrom: boolean = false;

  constructor(
    private usersService: UsersService,
    private fb: FormBuilder,
    private formValidatorCustom: FormValidatorCustom
  ) {
    this.validateForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    },
    [ this.formValidatorCustom.matchValidator('password','confirmPassword') ]);
  }

  ngOnInit(): void {
    this.listUsers();
  }

  public listUsers(): void {
    this.usersService.getAll().subscribe(
      (res) => {
        this.userSet = res.data.map( m => { m.active = m.is_active == 1 ? true : false; return m; } );
      }
    )
  }

  public onNew():void{
    this.titleModal = "Nuevo Usuario";
    this.isVisible = true;
    this.validateForm.get("id").setValue(0);
    this.editFrom = false;

    this.validateForm.patchValue({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    this.validateForm.get('password').setValidators([Validators.required]);
    this.validateForm.get('confirmPassword').setValidators([Validators.required]);
  }

  public handleCancel():void{
    this.isVisible = false;
    
  }

  private command(): any{
    return {
      id: this.validateForm.get("id").value,
      name: this.validateForm.get("name").value,
      email: this.validateForm.get("email").value,
      password: this.validateForm.get("password").value,
      password_confirmation: this.validateForm.get("confirmPassword").value,
    }
  }

  public handleOk():void{
    if( !validForm(this.validateForm) ){
      let service: Observable<any>;
      if( this.validateForm.get('id').value == 0 ){
        service = this.usersService.create( this.command() )
      }else{
        service = this.usersService.update( this.command() , this.validateForm.get('id').value)
      }
      service.subscribe(
        (res) => {
          this.isVisible = false;
          this.listUsers();
        }
      )
    }
  }

  public onEdit(userId: number): void{
    this.usersService.edit(userId).subscribe(
      (res) => {
        console.log(res);
        this.titleModal = "Editar Usuario";
        this.isVisible = true;
        this.validateForm.patchValue({
          id: res.id,
          name: res.name,
          email: res.email,
        });
        this.editFrom = true;
        this.validateForm.get('password').clearValidators();
        this.validateForm.get('confirmPassword').clearValidators();
        this.validateForm.get('password').updateValueAndValidity();
        this.validateForm.get('confirmPassword').updateValueAndValidity();
      }
    )
  }

  public onChangeStatus(status: any ,  id: number):void {
    this.usersService.updateStatus( { status } , id).subscribe(
      (res) => {}
    )
  }

}

