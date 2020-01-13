import HttpService from "@/services/http/http.service";
import { IRealmModel } from "@/models/realms/RealmModel";

export class RealmApi {
  public static async GetRealmInformations(): Promise<IRealmModel[]> {
    const result = await HttpService.Get<IRealmModel[]>(
      "/realm/GetRealmInformations"
    );
    return result;
  }
}
