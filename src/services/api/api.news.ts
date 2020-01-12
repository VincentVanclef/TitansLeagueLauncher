import HttpService from "@/services/http/http.service";
import { INews } from "@/models/news/news.model";

export class NewsApi {
  public static async GetNews(): Promise<INews[]> {
    const result = await HttpService.Get<INews[]>("/news/GetNews");
    return result;
  }
}
