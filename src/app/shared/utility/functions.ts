import { FormGroup } from "@angular/forms";

export function validForm(fg: FormGroup)
{
    var errors = [];
    for (const i in fg.controls) {
        fg.controls[i].markAsDirty();
        fg.controls[i].updateValueAndValidity();
        var status = fg.controls[i].status;
        if( status === 'INVALID' ) errors.push(status);
    }
    return errors.length === 0 ? false : true;
}

export function stringformat(str: string, ...val: any[])
{
    for (let index = 0; index < val.length; index++) {
        str = str.replace(`{${index}}` , val[index]);
    }
    return str;
}

