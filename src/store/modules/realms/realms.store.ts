import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import store from "@/store";
import { IRealmModel } from "@/models/realms/RealmModel";
import { RealmApi } from "@/services/api/api.realms";

interface IRealmsState {
  realms: IRealmModel[];
}

@Module({ namespaced: true, dynamic: true, store, name: "RealmsModule" })
class RealmsState extends VuexModule implements IRealmsState {
  realms: IRealmModel[] = [];

  @Mutation
  HandleRealmsResponse(realms: IRealmModel[]) {
    this.realms = realms;
  }

  @Action
  async Init() {
    const realms = await RealmApi.GetRealmInformations();
    this.HandleRealmsResponse(realms);
  }
}

const RealmsModule = getModule(RealmsState);

export { RealmsModule, IRealmsState };
