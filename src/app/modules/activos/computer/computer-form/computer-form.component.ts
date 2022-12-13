import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { AreaService } from 'src/app/shared/services/api/area/area.service';
import { BusinessService } from 'src/app/shared/services/api/business/business.service';
import { ComputersService } from 'src/app/shared/services/api/computers/computers.service';
import { CostcenterService } from 'src/app/shared/services/api/costcenter/costcenter.service';
import { EmployeeService } from 'src/app/shared/services/api/employee/employee.service';
import { AreaModel } from 'src/app/shared/services/api/models/area.model';
import { BusinessModel } from 'src/app/shared/services/api/models/business.model';
import { CostCenterModel } from 'src/app/shared/services/api/models/costcenter.model';
import { SedeModel } from 'src/app/shared/services/api/models/sede.model';
import { ParametersService } from 'src/app/shared/services/api/parameters.service';
import { SedeService } from 'src/app/shared/services/api/sede/sede.service';
import { constants } from 'src/app/shared/utility/constants';
import { validForm } from 'src/app/shared/utility/functions';
import { en_US, NzI18nService, es_ES } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-computer-form',
  templateUrl: './computer-form.component.html',
  styleUrls: ['./computer-form.component.css']
})
export class ComputerFormComponent implements OnInit {

  validateForm: FormGroup;

  constant = constants;
  dateFormat = 'yyyy-MM-dd';
  // Parameter
  typeComputerList: Array<any> = [];
  brandList: Array<any> = [];
  modelList: Array<any> = [];
  soList: Array<any> = [];
  statusList: Array<any> = [];
  supplierList: Array<any> = [];

  businessList: Array<BusinessModel> = [];
  sedeList: Array<SedeModel> = [];
  areaList: Array<AreaModel> = [];
  costCenterList: Array<CostCenterModel> = [];
  usersList: Array<any> = [];

  date: null;

  computerId: number = 0;
  
  constructor(
    private fb: FormBuilder,
    private parametersService: ParametersService,
    private businessService: BusinessService,
    private sedeService: SedeService,
    private areaService: AreaService,
    private costcenterService: CostcenterService,
    private computersService: ComputersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private i18n: NzI18nService
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.computerId = Number( params.get("id") ?? '0' )
    });

    this.i18n.setLocale(es_ES);

    this.validateForm = this.fb.group({
      id: [ null ],
      type_id: [null, [ Validators.required]],
      brand_id: [null, [ Validators.required]],
      model_id: [null, [ Validators.required]],
      number_serie: [null, [ Validators.required] ],
      number_inventory: [null ],
      act_fijo: [null ],
      name: [null, [ Validators.required]],
      so_id: [null, [ Validators.required]],
      cod_bitlocker: [null ],
      processor: ["" ],
      ram: ["" ],
      hdd: ["" ],
      date_start_guarantee: [null, [ Validators.required]],
      date_exp_guarantee: [null, [ Validators.required]],
      date_capital: [null, [ Validators.required]],
      status_id: [null, [ Validators.required]],
      number_capex: [null],
      name_capex: [null],
      pep_number: [null],
      solped: [null],
      oc: [null],
      pe_migo: [null],
      factura: [null],
      amount: [null],
      supplier_id: [null, [ Validators.required]],
      
      business_id: [ null ],
      sede_id: [ null ],
      area_id: [ null ],
      ceco_id: [null, [ Validators.required]],

      employee_id: [null, [ Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadOptions();
    
    if( this.computerId != 0 ) this.loadComputer();
  }

  private command(): any {
    return {
      id: this.computerId,
      type_id: this.validateForm.get("type_id").value,
      brand_id: this.validateForm.get("brand_id").value,
      model_id: this.validateForm.get("model_id").value,
      number_serie: this.validateForm.get("number_serie").value,
      number_inventory: this.validateForm.get("number_inventory").value,

      act_fijo: this.validateForm.get("act_fijo").value,
      name: this.validateForm.get("name").value,
      so_id: this.validateForm.get("so_id").value,
      cod_bitlocker: this.validateForm.get("cod_bitlocker").value,
      processor: this.validateForm.get("processor").value,
      ram: this.validateForm.get("ram").value,
      hdd: this.validateForm.get("hdd").value,
      date_start_guarantee: this.validateForm.get("date_start_guarantee").value,
      date_exp_guarantee: this.validateForm.get("date_exp_guarantee").value,
      date_capital: this.validateForm.get("date_capital").value,
      status_id: this.validateForm.get("status_id").value,
      number_capex: this.validateForm.get("number_capex").value,
      name_capex: this.validateForm.get("name_capex").value,
      pep_number: this.validateForm.get("pep_number").value,
      solped: this.validateForm.get("solped").value,
      oc: this.validateForm.get("oc").value,
      pe_migo: this.validateForm.get("pe_migo").value,
      factura: this.validateForm.get("factura").value,
      amount: this.validateForm.get("amount").value,
      supplier_id: this.validateForm.get("supplier_id").value,

      business_id: this.validateForm.get("business_id").value,
      sede_id: this.validateForm.get("sede_id").value,
      area_id: this.validateForm.get("area_id").value,
      ceco_id: this.validateForm.get("ceco_id").value,
      employee_id: this.validateForm.get("employee_id").value
    }
  }

  public submitForm(): void{
    if( !validForm(this.validateForm) ){
      let service: Observable<any>;
      if( this.computerId == 0 ){
        service = this.computersService.create( this.command() )
      }else{
        service = this.computersService.update( this.command() , this.computerId )
      }
      service.subscribe(
        (res) => {
          this.router.navigate(['activos/computers'])
        }
      )
    }
  }

  private loadComputer(): void{
    this.computersService.edit(this.computerId).subscribe( (res) => {
      this.validateForm.patchValue({
        type_id: res.type_id,
        brand_id: res.brand_id,
        model_id: res.model_id,
        number_serie: res.number_serie,
        number_inventory: res.number_inventory,
        act_fijo: res.act_fijo,
        name: res.name,
        so_id: res.so_id,
        cod_bitlocker: res.cod_bitlocker,
        processor: res.processor,
        ram: res.ram,
        hdd: res.hdd,
        date_start_guarantee: res.date_start_guarantee,
        date_exp_guarantee: res.date_exp_guarantee,
        date_capital: res.date_capital,
        status_id: res.status_id,
        number_capex: res.number_capex,
        name_capex: res.name_capex,
        pep_number: res.pep_number,
        solped: res.solped,
        oc: res.oc,
        pe_migo: res.pe_migo,
        factura: res.factura,
        amount: res.amount,
        supplier_id: res.supplier_id,
        
        business_id: res.business_id,
        sede_id: res.sede_id,
        area_id: res.area_id,
        ceco_id: res.ceco_id,

        employee_id: res.employee_id
      })
    })
  }

  private loadOptions(): void{
    forkJoin([
      this.parametersService.search( this.constant.PARAMETER.TYPECOMPUTER ),
      this.parametersService.search( this.constant.PARAMETER.BRANDCOMPUTER ),
      this.parametersService.search( this.constant.PARAMETER.MODELCOMPUTER ),
      this.parametersService.search( this.constant.PARAMETER.SOCOMPUTER ),
      this.parametersService.search( this.constant.PARAMETER.STATUSCOMPUTER ),
      this.parametersService.search( this.constant.PARAMETER.SUPPLIERCOMPUTER ),
      this.businessService.getAll()
    ]).subscribe(
      (res) => {
        this.typeComputerList = res[0].data;
        this.brandList = res[1].data;
        this.modelList = res[2].data;
        this.soList = res[3].data;
        this.statusList = res[4].data;
        this.supplierList = res[5].data;
        this.businessList = res[6].data;
      }
    )
  }

  public onChangeBusiness(ev: any):void {
    this.sedeService.search( this.validateForm.get('business_id').value ).subscribe(
      (res) => {
        this.sedeList = res.data;
      }
    )
    this.areaService.search( this.validateForm.get('business_id').value ).subscribe(
      (res) => {
        this.areaList = res.data;
      }
    )
  }

  public onChangeSede(ev: any): void {
    
  }

  public onChangeArea(ev: any):void {
    this.costcenterService.search( this.validateForm.get('area_id').value ).subscribe(
      (res) => {
        this.costCenterList = res.data;
      }
    )
  }

  public onChangeCostCenter(ev: any):void {
    this.employeeService.search( this.validateForm.get('ceco_id').value ).subscribe(
      (res) => {
        this.usersList = res.data;
      }
    )
  }

}
