import { IAccount, IAccountData, ApplicationUser } from "../user.model";

export interface IUserLoginResponse {
  account: IAccount;
  accountData: IAccountData;
  user: ApplicationUser;
  token: string;
}
