<template>
    <div class="login">
        <form class="login-form" @submit.prevent="Login">
            <div class="flex-row">
                <label class="lf--label" for="username">
                    <i class="fa fa-envelope"></i>
                </label>
                <input id="username" v-model="email" class="lf--input" placeholder="Email"
                       type="text" :disabled="loading">
            </div>
            <div class="flex-row">
                <label class="lf--label" for="password">
                    <i class="fa fa-lock"></i>
                </label>
                <input
                    id="password"
                    v-model="password"
                    v-pwt="{ color: '#000', top: 13 }"
                    class="lf--input"
                    placeholder="Password"
                    type="password"
                    :disabled="loading">
            </div>
            <button type="submit" class="button button-orange lf--submit" :disabled="loading">
                LOGIN
            </button>
            <a class="lf--forgot" href="#">Forgot password?</a>
        </form>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { UserModule } from '@/store/modules/user/user.store';
import { IUserLoginRequest } from '@/models/user/requests/UserLoginRequest';
import { Route } from 'vue-router';
import LogService from '@/services/logs/log.service';

@Component({
    components: {}
})
export default class Login extends Vue {
	email: string = '';
	password: string = '';
	loading: boolean = false;

	async Login() {
	    const request: IUserLoginRequest = {
	        email: this.email,
	        password: this.password
	    };

	    try {
	        this.loading = true;
	        await UserModule.Login(request);
	    } finally {
	        this.loading = false;
	    }

	    if (UserModule.IsLoggedIn) {
	        try {
	            await this.$router.push('/user/profile');
	        } catch (e) {
	            LogService.Log('LoginRoute', e);
	        }
	    } else {
	        this.$bvToast.toast('Login Failed', {
	            title: 'Unable to login. Please try again.',
	            variant: 'danger',
	            solid: true
	        });
	    }
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

$left-color: #242e4d;
$right-color: #897e79;
$green-dark: #35c3c1;
$green-light: #00d6b7;
$gray: #8f8f8f;
$gray-light: #f5f6f8;

.login {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	position: relative;

	font-size: 1.5em;

	&:before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;

		// Noise effect
		opacity: 0.3;
	}
}

.login-form {
	@include pageBackground;
	padding: 2em 2em 0 2em;
}

.flex-row {
	display: flex;
	flex-direction: row;
	margin-bottom: 1em;
}

.lf--label {
	width: 2em;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 50px;
	color: #000;

	background: $gray-light;
	cursor: pointer;
}

.lf--input {
	flex: 1;
	padding: 1em;
	color: #000;
	font-size: 1rem;
	height: 50px;

	&:focus {
		transition: transform 0.15s ease;
		transform: scale(1.1);
	}
}

.lf--submit {
	width: 100%;
	height: 50px;
}

.lf--forgot {
	display: flex;
	align-items: center;
	justify-content: center;
	color: $green-light;
	padding-top: 2em;
	font-size: 0.65em;
	text-align: center;
	position: relative;

	&:hover {
		transition: transform 0.15s ease;
		transform: scale(1.1);
	}
}
</style>
