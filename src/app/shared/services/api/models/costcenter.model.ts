import { BusinessModel } from "./business.model";
import { SedeModel } from "./sede.model";
import { AreaModel } from "./area.model";

export class CostCenterModel{
    id: number;
    code: string;
    name: string;
    business: BusinessModel;
    business_id: number;
    sede: SedeModel;
    sede_id: number;
    area: AreaModel;
    area_id: number;
}
export class CostCenterModelFindAll{
    data: Array<CostCenterModel>;
    message: string;
    success: boolean;
}