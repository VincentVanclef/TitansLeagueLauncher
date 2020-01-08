import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import store from "@/store";
import { Jwt } from "@/models/jwt/jwt.model";
import { ApplicationUser } from "@/models/user/user.model";

interface IUserState {
  user?: ApplicationUser | null;
  token?: Jwt | null;
}

@Module({ namespaced: true, dynamic: true, store, name: "UserModule" })
class UserState extends VuexModule implements IUserState {
  user: ApplicationUser | null = null;
  token: Jwt | null = null;

  @Action
  async RefreshToken(): Promise<boolean> {
    return true;
  }
}

const UserModule = getModule(UserState);

export { UserModule, IUserState };
