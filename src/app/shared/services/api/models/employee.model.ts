import { AreaModel } from "./area.model";
import { CostCenterModel } from "./costcenter.model";

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
    status: boolean;
}
export class EmployeeModelFindAll{
    data: Array<EmployeeModel>;
    message: string;
    success: boolean;
}