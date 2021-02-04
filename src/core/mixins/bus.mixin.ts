import Bus from '@/core/bus';
import { Component, Vue } from 'vue-property-decorator';
import { BusConstants } from '@/core/constants';
import HttpStatus from 'http-status-codes';
import { IValidationErrorData } from '@/services/http/interceptors/validationErrors.interceptor';
import dispatchActionForAllModules from '@/store/initialize.stores';
import { ClientMessage, ClientMessageType } from '../messages/messages.store';
import { VoteSiteViewObject } from '@/types/apiServerContract';

@Component
export default class BusHandler extends Vue {
	private OnLogout() {
		dispatchActionForAllModules('Clear');

		try {
			this.$router.push('/');
		} catch (e) {}
	}

	private OnValidationErrors(data: IValidationErrorData) {
		if (data.httpStatus === HttpStatus.UNAUTHORIZED) {
			this.$router.push('/user/login');
			this.OnLogout();
			return;
		}

		this.$bvToast.toast(data.message || 'Error', {
			title: `${data.httpStatusText}`,
			variant: 'danger',
			solid: true
		});
	}

	private OnUpdateAvailable() {
		this.$bvToast.toast('A new update is being downloaded in the background.', {
			title: 'Update Available',
			variant: 'primary',
			solid: true
		});
	}

	private HandleErrorMessages(newMessages: ClientMessage[]): void {
		newMessages.forEach(msg => {
			this.$bvToast.toast(msg.message || 'Error', {
				variant: 'danger',
				solid: true,
				title: ClientMessageType[msg.messageType] ?? 'Error'
			});
		});
	}

	private handleVoteSuccess(site: VoteSiteViewObject) {
		this.$bvToast.toast(`Succesfully voted for ${site.name}! You have been rewarded ${site.value} VP!`, {
			title: 'Success',
			variant: 'success',
			solid: true
		});
	}

	created() {
		Bus.on(BusConstants.OnLogout, this.OnLogout);
		Bus.on(BusConstants.GeneralErrorEventKey, this.HandleErrorMessages);
		Bus.on(BusConstants.VoteSuccess, this.handleVoteSuccess);
		Bus.on(BusConstants.UpdateAvailable, this.OnUpdateAvailable);
	}

	destroyed() {
		Bus.off(BusConstants.OnLogout, this.OnLogout);
		Bus.off(BusConstants.GeneralErrorEventKey, this.HandleErrorMessages);
		Bus.off(BusConstants.VoteSuccess, this.handleVoteSuccess);
		Bus.off(BusConstants.UpdateAvailable, this.OnUpdateAvailable);
	}
}
