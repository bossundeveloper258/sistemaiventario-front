import { AreaModel } from "./area.model";
import { BusinessModel } from "./business.model";
import { CostCenterModel } from "./costcenter.model";
import { EmployeeModel } from "./employee.model";
import { ParameterModel } from "./parameter.model";
import { SedeModel } from "./sede.model";

export class ComputerModel{
    type_id: number;
    type: ParameterModel;
    brand_id: number;
    brand: ParameterModel;
    model_id: number;
    model: ParameterModel;
    number_serie: string;
    number_inventory: string;
    act_fijo: string;
    name: string;
    so_id: number;
    so: ParameterModel;
    cod_bitlocker: string;
    processor: string;
    ram: string;
    hdd: string;
    date_start_guarantee: string;
    date_exp_guarantee: string;
    date_capital: string;
    status_id: number;
    status: ParameterModel;
    number_capex: string;
    name_capex: string;
    pep_number: string;
    solped: string;
    oc: string;
    pe_migo: string;
    factura: string;
    amount: number;
    supplier_id: number;
    supplier: ParameterModel;
    ceco_id: number;
    ceco: CostCenterModel;
    area_id: number;
    area: AreaModel;
    business_id: number;
    business: BusinessModel;
    sede_id: number;
    sede: SedeModel;
    employee_id: number;
    employee: EmployeeModel;
    user_id: number;
}
export class ComputerModelFindAll{
    data: Array<ComputerModel>;
    message: string;
    success: boolean;
}