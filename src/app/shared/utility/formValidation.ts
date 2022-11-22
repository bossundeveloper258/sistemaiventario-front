import { Injectable } from "@angular/core";
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class FormValidatorCustom{
    constructor(){}
    
    validateRuc = (control: FormControl) : {[s: string] : boolean} => {
        if(control.value === null || control.value === "") return {}
        if( control.value.toString().length !== 11 ) return { error: true, validateRUC: true}
        if( control.value.toString().slice(0,2) != "10" && control.value.toString().slice(0,2) != "20" && control.value.toString().slice(0,2) != "15" ) return { error: true, validateRUC: true}
        return {}
    }

    matchValidator(source: string, target: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
          const sourceCtrl = control.get(source);
          const targetCtrl = control.get(target);
    
          return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
            ? { mismatch: true }
            : null;
        };
    }
}