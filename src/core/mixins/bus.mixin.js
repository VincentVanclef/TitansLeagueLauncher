import { __decorate } from 'tslib';
import Bus from '../bus/index';
import { Component, Vue } from 'vue-property-decorator';
import HttpStatus from 'http-status-codes';
import { SessionStorageService } from '@/services/storage/storage.service';
import { BusConstants, StorageConstants } from '@/core/Constants';
import AnalyticsRequest from '@/models/requests/AnalyticsRequest';
import { UserModule } from '@/store/modules/user/user.store';
import { AccountsModule } from '@/store/modules/accounts/accounts.store';
import { AnalyticsModule } from '@/store/modules/analytics/analytics.store';
import { TrackingsModule } from '@/store/modules/trackings/trackings.store';
import { RecommendationsModule } from '@/store/modules/recommendations/recommendations.store';
import dispatchActionForAllModules from '@/store/initialize.stores';
let BusHandler = class BusHandler extends Vue {
    OnLogin() {
        AccountsModule.SetActiveAccount(null);
        AccountsModule.ClearLicenses();
        SessionStorageService.removeItem(StorageConstants.SelectedAccountData);
        // this.$bvToast.toast(`Welcome ${UserModule.user!.name}`, {
        //   title: "Login Successful",
        //   variant: "primary",
        //   solid: true
        // });
    }

    OnLogout() {
        SessionStorageService.removeItem(StorageConstants.UserData);
        SessionStorageService.removeItem(StorageConstants.SelectedAccountData);
        dispatchActionForAllModules('Clear');
    }

    OnValidationErrors(data) {
        if (data.httpStatus === HttpStatus.UNAUTHORIZED) {
            this.$router.push('/user/login');
            this.OnLogout();
            return;
        }
        this.$bvToast.toast(data.message || 'Error', {
            title: `${data.httpStatusText} (${data.httpStatus})`,
            variant: 'danger',
            solid: true
        });
    }

    async SynchronizeAnalytics() {
        if (!UserModule.IsLoggedIn) return;
        if (!AccountsModule.activeAccount) return;
        const request = new AnalyticsRequest(AccountsModule.activeAccount.key, AnalyticsModule.startDate, AnalyticsModule.endDate);
        switch (this.$route.name) {
        case BusConstants.RevenueSummaryRoute:
            AnalyticsModule.GetRevenueSummary(request);
            break;
        case BusConstants.TrackingsSummaryRoute:
            TrackingsModule.GetTrackingsSummary(request);
            break;
        case BusConstants.RecommendationsSummaryRoute:
            RecommendationsModule.GetRecommendationsSummary(request);
            break;
        }
    }

    OpenAccountSelectionModal() {
        this.$bvModal.show('account-selection-modal');
    }

    created() {
        Bus.on(BusConstants.OnLogin, this.OnLogin);
        Bus.on(BusConstants.OnLogout, this.OnLogout);
        Bus.on(BusConstants.ValidationError, this.OnValidationErrors);
        Bus.on(BusConstants.SynchronizeAnalytics, this.SynchronizeAnalytics);
        Bus.on(BusConstants.OpenAccountSelectionModal, this.OpenAccountSelectionModal);
    }

    destroyed() {
        Bus.off(BusConstants.OnLogin, this.OnLogin);
        Bus.off(BusConstants.OnLogout, this.OnLogout);
        Bus.off(BusConstants.ValidationError, this.OnValidationErrors);
        Bus.off(BusConstants.SynchronizeAnalytics, this.SynchronizeAnalytics);
        Bus.off(BusConstants.OpenAccountSelectionModal, this.OpenAccountSelectionModal);
    }
};
BusHandler = __decorate([Component], BusHandler);
export default BusHandler;
// # sourceMappingURL=bus.mixin.js.map
