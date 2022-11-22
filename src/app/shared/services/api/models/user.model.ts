export class UserModel{
    id: number;
    name: string;
    email: string;
    is_active: number;
    active: boolean;
}
export class UserModelFindAll{
    data: Array<UserModel>;
    message: string;
    success: boolean;
}