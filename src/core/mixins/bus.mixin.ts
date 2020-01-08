import Bus from "@/core/bus";
import { Component, Vue } from "vue-property-decorator";
import { BusConstants } from "@/core/constants";
import HttpStatus from "http-status-codes";
import { IValidationErrorData } from "@/services/http/interceptors/validationErrors.interceptor";

@Component
export default class BusHandler extends Vue {
  private OnLogin() {}

  private OnLogout() {}

  private OnValidationErrors(data: IValidationErrorData) {
    if (data.httpStatus === HttpStatus.UNAUTHORIZED) {
      this.$router.push("/user/login");
      this.OnLogout();
      return;
    }

    this.$bvToast.toast(data.message || "Error", {
      title: `${data.httpStatusText} (${data.httpStatus})`,
      variant: "danger",
      solid: true
    });
  }

  created() {
    Bus.on(BusConstants.OnLogin, this.OnLogin);

    Bus.on(BusConstants.OnLogout, this.OnLogout);

    Bus.on(BusConstants.ValidationError, this.OnValidationErrors);
  }

  destroyed() {
    Bus.off(BusConstants.OnLogin, this.OnLogin);

    Bus.off(BusConstants.OnLogout, this.OnLogout);

    Bus.off(BusConstants.ValidationError, this.OnValidationErrors);
  }
}
