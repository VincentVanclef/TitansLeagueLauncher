import { ApplicationUser } from "../user.model";

export interface IUserLoginResponse {
  userDto: ApplicationUser;
  token: string;
}
