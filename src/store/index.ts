import Vue from "vue";
import Vuex from "vuex";

import { IUserState } from "./modules/user/user.store";
import { IConfigState } from "./modules/config/config.store";

Vue.use(Vuex);

export interface IRootState {
  UserModule: IUserState;
  ConfigModule: IConfigState;
}

export default new Vuex.Store<IRootState>({});
