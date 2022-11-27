import { CostCenterModel } from "./costcenter.model";

export class EmployeeModel{
    id: number;
    gpid: string;
    name: string;
    email: string;
    job: string;
    cost_center_id: number;
    cost_center: CostCenterModel;
}
export class EmployeeModelFindAll{
    data: Array<EmployeeModel>;
    message: string;
    success: boolean;
}