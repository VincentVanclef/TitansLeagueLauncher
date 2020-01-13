import Vue from "vue";
import Vuex from "vuex";

import { IUserState } from "./modules/user/user.store";

Vue.use(Vuex);

export interface IRootState {
  UserModule: IUserState;
}

export default new Vuex.Store<IRootState>({});
