import HttpService from "@/services/http/http.service";
import { IUserLoginRequest } from "@/models/user/requests/UserLoginRequest";
import { IUserLoginResponse } from "@/models/user/responses/UserLoginResponse";
import { IUserRegisterRequest } from "@/models/user/requests/UserRegisterRequest";
import { IVoteSite } from "@/models/user/vote/VoteSite";
import { IVoteTimer } from "@/models/user/vote/VoteTimer";
import { IVoteResponse } from "@/models/user/vote/VoteResponse";

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

  public static async GetVoteSites(): Promise<IVoteSite[]> {
    const result = await HttpService.Get<IVoteSite[]>("/vote/GetVoteSites");
    return result;
  }

  public static async GetVoteTimers(): Promise<IVoteTimer[]> {
    const result = await HttpService.Get<IVoteTimer[]>("/vote/GetVoteTimers");
    return result;
  }

  public static async Vote(site: IVoteSite): Promise<IVoteResponse> {
    const result = await HttpService.Post<IVoteResponse>("/vote/vote/" + site.id);
    return result;
  }
}
