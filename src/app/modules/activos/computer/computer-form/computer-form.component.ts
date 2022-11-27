import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ParametersService } from 'src/app/shared/services/api/parameters.service';
import { constants } from 'src/app/shared/utility/constants';

@Component({
  selector: 'app-computer-form',
  templateUrl: './computer-form.component.html',
  styleUrls: ['./computer-form.component.css']
})
export class ComputerFormComponent implements OnInit {

  validateForm: FormGroup;

  constant = constants;

  // Parameter
  typeComputerList: Array<any> = [];
  brandList: Array<any> = [];
  modelList: Array<any> = [];

  constructor(
    private fb: FormBuilder,
    private parametersService: ParametersService
  ) {
    this.validateForm = this.fb.group({
      typeComputer_id: [null, [ Validators.required]],
      brand_id: [null, [ Validators.required]],
      model_id: [null, [ Validators.required]],
    });
  }

  ngOnInit(): void {
  }


  private loadOptions(): void{
    forkJoin([
      this.parametersService.search(3)
    ]).subscribe(
      (responses) => {
        
      }
    )
  }

}
