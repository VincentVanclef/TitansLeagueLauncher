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
import { ApplicationConfig } from "@/core/constants";

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
  async GetRealmInformations() {
    const realms = await RealmApi.GetRealmInformations();
    this.HandleRealmsResponse(realms);
  }

  @Action
  async Init() {
    await this.GetRealmInformations();

    setInterval(() => {
      this.GetRealmInformations();
    }, ApplicationConfig.SeverStatusUpdateInterval);
  }
}

const RealmsModule = getModule(RealmsState);

export { RealmsModule, IRealmsState };
