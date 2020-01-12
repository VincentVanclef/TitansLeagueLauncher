import { Jwt } from "@/models/jwt/jwt.model";
import LogService from "@/services/logs/log.service";

export default class JwtService {
  public static DecodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      LogService.Log("DecodeToken", e);
      return null;
    }
  }

  public DecodeTokenAs<T>(token: string): T | null {
    try {
      return token !== null ? (JSON.parse(token) as T) : null;
    } catch (err) {
      LogService.Log("DecodeTokenAs", err);
      return null;
    }
  }

  public static DecodeTokenAsJwt(token: string): Jwt {
    const decodedToken = this.DecodeToken(token);
    return new Jwt(token, decodedToken);
  }
}
