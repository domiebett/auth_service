import { IUser } from "../../data-layer/entity/User";

export interface ILoginResponse {
    user: IUser;
    token: string;
}

export interface IRegisterResponse {
    message: string
}
