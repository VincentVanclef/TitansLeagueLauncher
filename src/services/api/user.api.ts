import HttpService from "@/services/http/http.service";
import { IUserLoginRequest } from "@/models/user/requests/UserLoginRequest";
import { IUserLoginResponse } from "@/models/user/responses/UserLoginResponse";
import { IUserRegisterRequest } from "@/models/user/requests/UserRegisterRequest";

export class UserApi {
  public static async Login(
    request: IUserLoginRequest
  ): Promise<IUserLoginResponse> {
    const result = await HttpService.Post<IUserLoginResponse>(
      "/auth/login",
      request
    );
    return result;
  }

  public static async Register(
    request: IUserRegisterRequest
  ): Promise<IUserLoginResponse> {
    const result = await HttpService.Post<IUserLoginResponse>(
      "/auth/register",
      request
    );
    return result;
  }
}
