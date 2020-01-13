import Vue from "vue";
import Vuex from "vuex";

import { IUserState } from "./modules/user/user.store";
import { IConfigState } from "./modules/config/config.store";
import { IRealmsState } from "./modules/realms/realms.store";

Vue.use(Vuex);

export interface IRootState {
  UserModule: IUserState;
  ConfigModule: IConfigState;
  RealmsModule: IRealmsState;
}

export default new Vuex.Store<IRootState>({});
