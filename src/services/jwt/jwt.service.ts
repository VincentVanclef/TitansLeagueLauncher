import { Jwt } from '@/models/jwt/jwt.model';

export default class JwtService {
  public static DecodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  }

  public DecodeTokenAs<T>(token: string): T | null {
    try {
      return token !== null ? (JSON.parse(token) as T) : null;
    } catch (err) {
      return null;
    }
  }

  public static DecodeTokenAsJwt(token: string): Jwt {
    const decodedToken = this.DecodeToken(token);
    return new Jwt(token, decodedToken);
  }
}
