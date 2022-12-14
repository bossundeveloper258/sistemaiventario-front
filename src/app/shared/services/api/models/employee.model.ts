import { AreaModel } from "./area.model";
import { BusinessModel } from "./business.model";
import { CostCenterModel } from "./costcenter.model";
import { SedeModel } from "./sede.model";
export class EmployeeModel{
    id: number;
    gpid: string;
    name: string;
    email: string;
    job: string;
    area_id: number;
    area: AreaModel;
    cost_center_id: number;
    cost_center: CostCenterModel;
    business_id: number;
    business: BusinessModel;
    sede_id: number;
    sede: SedeModel;
    status: boolean;
}
export class EmployeeModelFindAll{
    data: Array<EmployeeModel>;
    message: string;
    success: boolean;
}