<template>
    <div class="navigation">
        <div class="navigation_container">
            <div class="navigation_link" :class="{ active: IsActive('Home') }" @click="Navigate('/')">
                <div class="text">
                    News
                </div>
            </div>
            <div class="navigation_link" :class="{ active: IsActive('Status') }" @click="Navigate('/status')">
                <div class="text">
                    Server Status
                </div>
            </div>
            <div v-if="IsLoggedIn" class="navigation_link" :class="{ active: IsActive('Profile') }" @click="Navigate('/user/profile')">
                <div class="text">
                    Profile
                </div>
            </div>
            <div v-if="IsLoggedIn" class="navigation_link" :class="{ active: IsActive('Vote') }" @click="Navigate('/user/vote')">
                <div class="text">
                    Vote
                </div>
            </div>
            <div v-if="!IsLoggedIn" class="navigation_link" :class="{ active: IsActive('Login') }" @click="Navigate('/user/login')">
                <div class="text">
                    Login
                </div>
            </div>
            <div v-if="!IsLoggedIn" class="navigation_link" :class="{ active: IsActive('Register') }" @click="Navigate('/user/register')">
                <div class="text">
                    Register
                </div>
            </div>
            <div v-if="IsLoggedIn" class="navigation_link" @click="Logout()">
                <div class="text">
                    Logout
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { UserModule } from '../store/modules/user/user.store';

@Component({
    components: {}
})
export default class Navigation extends Vue {
	@Prop() IsLoggedIn!: boolean;

	async Navigate(to: string) {
	    try {
	        await this.$router.push(to);
	    } catch (e) {}
	}

	IsActive(path: string) {
	    return this.$route.name === path;
	}

	async Logout() {
	    const result = await this.$bvModal.msgBoxConfirm('Are you sure you wish to logout?', {
	        centered: true,
	        noCloseOnBackdrop: true,
	        noCloseOnEsc: true
	    });
	    if (!result) return;

	    await UserModule.Logout();
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.navigation_container {
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.75);
	padding: 10px 0px 20px 0px;
	border: 1px solid #111;
	border-radius: 4px;
	box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.75);
}

.navigation_link {
	font-size: 16px;
	font-weight: 300;
	text-align: center;
	position: relative;
	height: 40px;
	line-height: 40px;
	margin-top: 10px;
	overflow: hidden;
	width: 90%;
	margin-left: 5%;
	cursor: pointer;
	user-select: none;
}
.navigation_link:after {
	content: '';
	position: absolute;
	width: 80%;
	border-bottom: 1px solid rgba(255, 255, 255, 0.5);
	bottom: 50%;
	left: -100%;
	transition-delay: all 0.5s;
	transition: all 0.5s;
}
.navigation_link:hover:after,
.navigation_link.hover:after {
	left: 100%;
}
.navigation_link .text {
	text-shadow: 0px -40px 0px rgba(255, 255, 255, 1);
	transition: all 0.75s;
	transform: translateY(100%) translateZ(0);
	transition-delay: all 0.25s;
}
.navigation_link:hover .text,
.navigation_link.hover .text {
	text-shadow: 0px -40px 0px rgba(255, 255, 255, 0);
	transform: translateY(0%) translateZ(0) scale(1.1);
	font-weight: 600;
}

.active {
	background: rgba(255, 255, 255, 0.25);
	border-radius: 6px;
}
</style>
