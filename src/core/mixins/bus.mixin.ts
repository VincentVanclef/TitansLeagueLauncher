import Bus from "@/core/bus";
import { Component, Vue } from "vue-property-decorator";
import { BusConstants } from "@/core/constants";
import HttpStatus from "http-status-codes";
import { IValidationErrorData } from "@/services/http/interceptors/validationErrors.interceptor";
import dispatchActionForAllModules from "@/store/initialize.stores";
import { IUserLoginResponse } from "@/models/user/responses/UserLoginResponse";

@Component
export default class BusHandler extends Vue {
  private OnLogin(data: IUserLoginResponse) {}

  private OnLogout() {
    dispatchActionForAllModules("Clear");

    try {
      this.$router.push("/");
    } catch (e) {}
  }

  private OnValidationErrors(data: IValidationErrorData) {
    if (data.httpStatus === HttpStatus.UNAUTHORIZED) {
      this.$router.push("/user/login");
      this.OnLogout();
      return;
    }

    this.$bvToast.toast(data.message || "Error", {
      title: `${data.httpStatusText}`,
      variant: "danger",
      solid: true
    });
  }

  private OnUpdateAvailable() {
    this.$bvToast.toast("A new update is being downloaded in the background.", {
      title: "Update Available",
      variant: "primary",
      solid: true
    });
  }

  created() {
    Bus.on(BusConstants.OnLogin, this.OnLogin);

    Bus.on(BusConstants.OnLogout, this.OnLogout);

    Bus.on(BusConstants.ValidationError, this.OnValidationErrors);

    Bus.on(BusConstants.UpdateAvailable, this.OnUpdateAvailable);
  }

  destroyed() {
    Bus.off(BusConstants.OnLogin, this.OnLogin);

    Bus.off(BusConstants.OnLogout, this.OnLogout);

    Bus.off(BusConstants.ValidationError, this.OnValidationErrors);

    Bus.off(BusConstants.UpdateAvailable, this.OnUpdateAvailable);
  }
}
