import HttpService from '@/services/http/http.service';
import {
    Realmlist,
    RealmlistsViewModel,
    RealmsViewModel,
    UpdateRealmsViewModel,
    AddRealmRequest,
    DeleteRealmRequest,
    EditRealmRequest,
    UpdateRealmNameRequest,
    UpdateRealmAllowedSecurityLevelRequest,
    RestartRealmRequest,
    GenericViewModel
} from '@/types/apiServerContract';

const API_URL = 'realm/';

export class RealmApi {
    public static async GetRealms(): Promise<RealmlistsViewModel> {
        return HttpService.Get<RealmlistsViewModel>(API_URL + 'GetRealms');
    }

    public static async GetRealmInformations(): Promise<RealmsViewModel> {
        return HttpService.Get<RealmsViewModel>(API_URL + 'GetRealmInformations');
    }

    public static async AddRealm(request: AddRealmRequest): Promise<UpdateRealmsViewModel> {
        return HttpService.Post<UpdateRealmsViewModel>(API_URL + 'AddRealm', request);
    }

    public static async EditRealm(request: EditRealmRequest): Promise<UpdateRealmsViewModel> {
        return HttpService.Post<UpdateRealmsViewModel>(API_URL + 'EditRealm', request);
    }

    public static async DeleteRealm(request: DeleteRealmRequest): Promise<GenericViewModel<boolean>> {
        return HttpService.Post<GenericViewModel<boolean>>(API_URL + 'DeleteRealm', request);
    }

    public static async UpdateRealmName(request: UpdateRealmNameRequest): Promise<UpdateRealmsViewModel> {
        return HttpService.Post<UpdateRealmsViewModel>(API_URL + 'UpdateRealmName', request);
    }

    public static async UpdateAllowedSecurityLevel(request: UpdateRealmAllowedSecurityLevelRequest): Promise<UpdateRealmsViewModel> {
        return HttpService.Post<UpdateRealmsViewModel>(API_URL + 'UpdateAllowedSecurityLevel', request);
    }

    public static async ExecuteServerScript(scriptId: number): Promise<GenericViewModel<boolean>> {
        return HttpService.Get<GenericViewModel<boolean>>(API_URL + 'ExecuteServerScript', {
            scriptId: scriptId
        });
    }

    public static async RestartRealm(request: RestartRealmRequest): Promise<GenericViewModel<boolean>> {
        return HttpService.Post<GenericViewModel<boolean>>(API_URL + 'RestartRealm', request);
    }

    public static async UploadDBC(files: any[], callback: (event: any) => void) {
        const formData = new FormData();
        files.forEach(file => formData.append('files', file));

        const result = await HttpService.Put<GenericViewModel<boolean>>(API_URL + 'UploadDBC', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (event: any) => callback(event)
        });
        return result;
    }

    public static async UploadPatch(file: any, callback: (event: any) => void) {
        const formData = new FormData();
        formData.append('file', file);

        const result = await HttpService.Put<GenericViewModel<boolean>>(API_URL + 'UploadPatch', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (event: any) => callback(event)
        });
        return result;
    }
}
