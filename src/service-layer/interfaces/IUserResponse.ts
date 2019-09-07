import { IUser } from "../../data-layer/entity/User";

export interface IUserResponse {
    data: IUser;
}

export interface IUsersResponse {
    data: IUser[];
}
