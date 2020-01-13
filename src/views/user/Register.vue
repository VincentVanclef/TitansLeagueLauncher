<template>
  <div class="register">
    <form class="login-form" @submit.prevent="Register">
      <div class="row">
        <div class="col-6 login-input">
          <label class="lf--label" for="firstname">
            <i class="fa fa-user"></i>
          </label>
          <input
            id="firstname"
            class="lf--input"
            placeholder="First name"
            type="text"
            v-model="firstname"
            :disabled="loading"
          />
        </div>
        <div class="col-6 login-input">
          <label class="lf--label" for="lastname">
            <i class="fa fa-user"></i>
          </label>
          <input
            id="lastname"
            class="lf--input"
            placeholder="Last name"
            type="text"
            v-model="lastname"
            :disabled="loading"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-6 login-input">
          <label class="lf--label" for="email">
            <i class="fa fa-envelope"></i>
          </label>
          <input
            id="email"
            class="lf--input"
            placeholder="Email"
            type="text"
            v-model="email"
            :disabled="loading"
          />
        </div>
        <div class="col-6 login-input">
          <label class="lf--label" for="username">
            <i class="fa fa-user"></i>
          </label>
          <input
            id="username"
            class="lf--input"
            placeholder="Username"
            type="text"
            v-model="username"
            :disabled="loading"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-6 login-input">
          <label class="lf--label" for="password">
            <i class="fa fa-lock"></i>
          </label>
          <input
            id="password"
            class="lf--input"
            placeholder="Password"
            type="password"
            v-model="password"
            :disabled="loading"
          />
        </div>
        <div class="col-6 login-input">
          <label class="lf--label" for="passwordConfirm">
            <i class="fa fa-lock"></i>
          </label>
          <input
            id="passwordConfirm"
            class="lf--input"
            placeholder="Confirm password"
            type="password"
            v-model="passwordConfirm"
            :disabled="loading"
          />
        </div>
      </div>

      <button
        type="submit"
        class="button button-orange lf--submit"
        :disabled="loading"
      >
        REGISTER
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { UserModule } from "@/store/modules/user/user.store";
import { IUserLoginRequest } from "@/models/user/requests/UserLoginRequest";
import { Route } from "vue-router";
import { IUserRegisterRequest } from "@/models/user/requests/UserRegisterRequest";
import LogService from "@/services/logs/log.service";

@Component({
  components: {}
})
export default class Register extends Vue {
  firstname: string = "";
  lastname: string = "";
  email: string = "";
  username: string = "";
  password: string = "";
  passwordConfirm: string = "";
  loading: boolean = false;

  async Register() {
    const request: IUserRegisterRequest = {
      firstname: this.firstname,
      lastname: this.lastname,
      username: this.username,
      email: this.email,
      password: this.password
    };

    try {
      this.loading = true;
      await UserModule.Register(request);
    } finally {
      this.loading = false;
    }

    if (UserModule.IsLoggedIn) {
      try {
        await this.$router.push("/user/profile");
      } catch (e) {
        LogService.Log("RegisterRoute", e);
      }
    } else {
      this.$bvToast.toast("Login Failed", {
        title: "Unable to login. Please try again.",
        variant: "danger",
        solid: true
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

$gray-light: #f5f6f8;

.register {
  @include pageBackground;
  padding: 2em 2em 0 2em;
}

// .login-form {
// }

.login-input {
  display: flex;
  flex-direction: row;
  margin-bottom: 1em;
}

.lf--label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15%;
  height: 35px;
  color: #000;

  background: $gray-light;
  cursor: pointer;
}

.lf--input {
  padding: 5px;
  color: #000;
  height: 35px;
  width: 85%;

  &:focus {
    transition: transform 0.15s ease;
    transform: scale(1.1);
  }
}

.lf--submit {
  width: 100%;
  height: 50px;
}
</style>
