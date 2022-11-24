export class BusinessModel{
    id: number;
    ruc: string;
    name: string;
    address: string;
}
export class BusinessModelFindAll{
    data: Array<BusinessModel>;
    message: string;
    success: boolean;
}