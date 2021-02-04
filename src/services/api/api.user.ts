import HttpService from '@/services/http/http.service';
import {
	UserLoginRequest,
	UserRegisterRequest,
	UpdateUserRequest,
	UpdateUsernameRequest,
	FindUserRequest,
	UserLoginViewModel,
	VoteSitesViewModel,
	VoteTimersViewModel,
	VoteSiteViewObject,
	UserChangePasswordRequest,
	UserTokenRefreshViewModel,
	LoginHistoryViewModel,
	UserDetailsViewModel,
	UpdatePasswordRequest,
	GenericViewModel,
	UserUpdateSettingsRequest,
	UserViewModel,
	UserResetPasswordRequest
} from '@/types/apiServerContract';
import { User } from '@/models/user/user.model';

const API_PATH = 'user/';
const API_PATH_ACCOUNT = 'account/';

export class UserApi {
	public static async Login(request: UserLoginRequest): Promise<UserLoginViewModel> {
		return HttpService.Post<UserLoginViewModel>(API_PATH + 'login', request);
	}

	public static async Logout(): Promise<void> {
		await HttpService.Get(API_PATH + 'logout');
	}

	public static async Register(request: UserRegisterRequest): Promise<UserLoginViewModel> {
		return HttpService.Post<UserLoginViewModel>(API_PATH + 'register', request);
	}

	public static async ForgotPassword(email: string): Promise<GenericViewModel<boolean>> {
		return HttpService.Get(API_PATH + 'ForgotPassword', {
			email
		});
	}

	public static async ResetPassword(request: UserResetPasswordRequest): Promise<UserLoginViewModel> {
		return HttpService.Post(API_PATH + 'ResetPassword', request);
	}

	public static async CancelResetPassword(token: string): Promise<GenericViewModel<boolean>> {
		return HttpService.Get(API_PATH + 'CancelResetPassword', {
			token
		});
	}

	public static async GetVoteSites(): Promise<VoteSitesViewModel> {
		return HttpService.Get<VoteSitesViewModel>('/vote/GetVoteSites');
	}

	public static async GetVoteTimers(): Promise<VoteTimersViewModel> {
		return HttpService.Get<VoteTimersViewModel>('/vote/GetVoteTimers');
	}

	public static async Vote(site: VoteSiteViewObject): Promise<GenericViewModel<boolean>> {
		return HttpService.Get<GenericViewModel<boolean>>('/vote/vote', {
			id: site.id
		});
	}

	public static async UpdateUser(request: UpdateUserRequest): Promise<GenericViewModel<boolean>> {
		return HttpService.Post<GenericViewModel<boolean>>(API_PATH + 'UpdateUser/', request);
	}

	public static async UpdateUserSettings(request: UserUpdateSettingsRequest): Promise<GenericViewModel<boolean>> {
		return HttpService.Post<GenericViewModel<boolean>>(API_PATH + 'UpdateUserSettings', request);
	}

	public static async ChangeWebsitePassword(request: UserChangePasswordRequest): Promise<GenericViewModel<boolean>> {
		return HttpService.Post<GenericViewModel<boolean>>(API_PATH + 'ChangePassword', request);
	}

	public static GetLoginHistory(page: number): Promise<LoginHistoryViewModel> {
		return HttpService.Get<LoginHistoryViewModel>(API_PATH + 'GetLoginHistory', {
			page: page
		});
	}

	public static async RefreshToken(token: string): Promise<UserTokenRefreshViewModel> {
		return HttpService.Post<UserTokenRefreshViewModel>(API_PATH + 'RefreshToken', {
			expiredToken: token
		});
	}

	public static async UpdateIngameAccountUsername(request: UpdateUsernameRequest): Promise<GenericViewModel<boolean>> {
		return HttpService.Post(API_PATH_ACCOUNT + 'UpdateUsername/', request);
	}

	public static async UpdateIngameAccountPassword(request: UpdatePasswordRequest): Promise<GenericViewModel<boolean>> {
		return HttpService.Post(API_PATH_ACCOUNT + 'UpdatePassword/', request);
	}

	public static async FindUser(request: FindUserRequest): Promise<User> {
		return HttpService.Post(API_PATH + 'FindUser', request);
	}

	public static async GetUserDetails(username: string): Promise<UserDetailsViewModel> {
		return HttpService.Get<UserDetailsViewModel>(API_PATH + 'GetUserDetails', {
			username
		});
	}

	public static async GetUserData(): Promise<UserViewModel> {
		return HttpService.Get<UserViewModel>(API_PATH + 'GetUserData');
	}

	public static async AcceptDonationTerms() {
		return HttpService.Get<GenericViewModel<boolean>>(API_PATH + 'AcceptDonationTerms');
	}
}
