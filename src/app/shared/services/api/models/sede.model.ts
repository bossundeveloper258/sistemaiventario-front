import { BusinessModel } from "./business.model";
import { ParameterModel } from "./parameter.model";

export class SedeModel{
    id: number;
    name: string;
    address: string;
    sede_type_id: number;
    serie: string;
    business_id: number;
    business: BusinessModel;
    sede_type: ParameterModel;
}
export class SedeModelFindAll{
    data: Array<SedeModel>;
    message: string;
    success: boolean;
}