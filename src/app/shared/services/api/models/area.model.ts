import { BusinessModel } from "./business.model";
import { SedeModel } from "./sede.model";

export class AreaModel{
    id: number;
    name: string;
    sede_id: number;
    business_id: number;
    business: BusinessModel;
    sede: SedeModel;
}
export class AreaModelFindAll{
    data: Array<AreaModel>;
    message: string;
    success: boolean;
}