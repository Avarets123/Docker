import { UserEntity } from "../entity/user.entity";




export interface IUserResponse {
    user: Omit<UserEntity, 'password'>;
    token: string;
};