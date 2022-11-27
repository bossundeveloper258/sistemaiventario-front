import { Component } from '@angular/core'
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { validForm } from 'src/app/shared/utility/functions';


@Component({
    templateUrl: './login-2.component.html'
})

export class Login2Component {
    loginForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authenticationService: AuthenticationService,
        private modalService: NzModalService,
        private router: Router
        ) {
        this.loginForm = this.fb.group({
            userName: [ null, [ Validators.required , Validators.minLength(8) ] ],
            password: [ null, [ Validators.required ] ]
        });
    }

    submitForm(): void {
        if( !validForm(this.loginForm) ){
            console.log();
            this.authenticationService
                .login( this.loginForm.get('userName').value , this.loginForm.get('password').value )
                .subscribe(
                    (res) => {
                        this.router.navigate(['/dashboard'], {
                            queryParams: {},
                        });
                    },
                    (error) => {
                        console.log(error);
                        this.modalService.error({ nzContent: error?.error?.message});
                    }
                )
        }
    }

    ngOnInit(): void {
        
    }
}    