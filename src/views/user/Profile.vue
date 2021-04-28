<template>
    <div v-if="User" class="profile">
        <div class="profile-header">
            {{ User.firstname }} {{ User.lastname }}
        </div>
        <div class="profile-container">
            <h5 class="pt-3 pl-1">
                User Information
            </h5>
            <form @submit.prevent="UpdateProfile">
                <div class="profile-content">
                    <div class="profile-entry">
                        <div class="mb-2">
                            <label for="firstname">First name</label>
                            <input v-model="firstname" name="firstname" type="text">
                        </div>
                        <div class="mb-2">
                            <label for="lastname">Nickname</label>
                            <input v-model="username" name="lastname" type="text">
                        </div>
                    </div>
                    <div class="profile-entry">
                        <div class="mb-2">
                            <label for="lastname">Last name</label>
                            <input v-model="lastname" name="lastname" type="text">
                        </div>
                        <div class="mb-2">
                            <label for="lastname">Location</label>
                            <input v-model="location" name="lastname" type="text">
                        </div>
                    </div>
                </div>
                <div class="profile-buttons">
                    <button class="button button-orange float-right" style="width: 140px; height: 30px; font-size: 0.8em;" type="submit">
                        Save Changes
                    </button>
                </div>
            </form>

            <h5 class="pt-5 pl-1">
                Website Password
            </h5>
            <form @submit.prevent="UpdatePassword">
                <div class="profile-content-password">
                    <div id="password" class="profile-entry">
                        <div class="mb-2">
                            <label for="password">Current Password</label>
                            <input v-model="password" v-pwt="{ color: '#fff', top: -21 }" name="password" type="password">
                        </div>
                    </div>
                    <div id="new-password" class="profile-entry">
                        <div class="mb-2">
                            <label for="new-password">New Password</label>
                            <input v-model="newPassword" v-pwt="{ color: '#fff', top: -21 }" name="new-password" type="password">
                        </div>
                    </div>
                    <div id="confirm-new-password" class="profile-entry">
                        <div class="mb-2">
                            <label for="new-password-confirm">Confirm New Password</label>
                            <input
                                id="password-field"
                                v-model="newPasswordConfirm"
                                v-pwt="{ color: '#fff', top: -21 }"
                                name="new-password-confirm"
                                type="password">
                        </div>
                    </div>
                </div>
                <div class="profile-buttons pb-4">
                    <button class="button button-orange float-right" style="width: 140px; height: 30px; font-size: 0.8em;" type="submit">
                        Save Password
                    </button>
                </div>
            </form>

            <div class="profile-general">
                <h5>Account Information</h5>
                <div class="account-information">
                    <div id="title">
                        Vote Points
                    </div>
                    <div id="title">
                        Donation Points
                    </div>
                    <div id="value">
                        {{ AccountData.vp }}
                    </div>
                    <div id="value">
                        {{ AccountData.dp }}
                    </div>
                    <div id="title">
                        Total Votes
                    </div>
                    <div id="title">
                        Joined
                    </div>
                    <div id="value">
                        {{ User.totalVotes }}
                    </div>
                    <div id="value">
                        {{ GetDate(User.joinDate) }}
                    </div>
                </div>
            </div>

            <div class="profile-stats">
                <div class="profile-stats-roles">
                    <div class="profile-stats-title">
                        Website Roles
                    </div>
                    <ul class="list-unstyled pt-1">
                        <li v-for="role in User.roles" :key="role">
                            {{ role }}
                        </li>
                    </ul>
                </div>
                <div class="profile-stats-roles">
                    <div class="profile-stats-title">
                        Game Roles
                    </div>
                    <div v-for="role in Account.accountAccess" :key="role.realmId" class="profile-stats-entry">
                        <div id="realm" :title="GetRealmNameById(role.realmId)">
                            {{ GetRealmNameById(role.realmId) }}
                        </div>
                        <div id="rank">
                            {{ GetGameRankName(role.gmlevel) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { UserModule } from '@/store/modules/user/user.store';

import { IChangePasswordRequest } from '@/models/user/requests/ChangePasswordRequest';
import { UserApi } from '@/services/api/api.user';
import { IRealmModel } from '@/models/realms/RealmModel';

import { HelperMethods } from '@/core/HelperMethods';
import moment from 'moment';
import { IUpdateUserRequest } from '../../models/user/requests/UpdateUserRequest';
import { AccountViewObject, GameAccountData, UpdateUserRequest, UserViewObject } from '@/types/apiServerContract';

@Component({
    components: {}
})
export default class UserProfile extends Vue {
	@Prop() realms!: IRealmModel[];

	firstname: string = '';
	lastname: string = '';
	username: string = '';
	location: string = '';

	password: string = '';
	newPassword: string = '';
	newPasswordConfirm: string = '';

	get User(): UserViewObject | null {
	    return UserModule.user;
	}

	get Account(): AccountViewObject | null {
	    return UserModule.account;
	}

	get AccountData(): GameAccountData | null {
	    return UserModule.account?.accountData ?? null;
	}

	GetDate(date: Date) {
	    return moment(date).format('MMMM Do YYYY, HH:mm:ss');
	}

	async UpdateProfile() {
	    const request: UpdateUserRequest = {
	        userId: this.User!.id,
	        email: this.User!.email,
	        firstname: this.firstname,
	        lastname: this.lastname,
	        username: this.username,
	        location: this.location
	    };

	    await UserApi.UpdateUser(request);

		this.User!.firstname = this.firstname;
		this.User!.lastname = this.lastname;
		this.User!.userName = this.username;
		this.User!.location = this.location;

		this.$bvToast.toast('Your profile informations has been successfully updated.', {
		    title: 'Success',
		    variant: 'success',
		    solid: true
		});
	}

	async UpdatePassword() {
	    const request: IChangePasswordRequest = {
	        currentPassword: this.password,
	        newPassword: this.newPassword,
	        newPasswordAgain: this.newPasswordConfirm
	    };

	    await UserApi.ChangeWebsitePassword(request);

	    this.$bvToast.toast('Your website password has been successfully updated.', {
	        title: 'Success',
	        variant: 'success',
	        solid: true
	    });
	}

	GetRealmById(id: number) {
	    return this.realms.find(x => x.id == id);
	}

	GetRealmNameById(id: number) {
	    const realm = this.GetRealmById(id);
	    return realm ? realm.name : 'Unknown';
	}

	GetGameRankColor(rank: number) {
	    return HelperMethods.GetGameRankColor(rank);
	}

	GetGameRankName(rank: number) {
	    return HelperMethods.GetGameRankName(rank);
	}

	created() {
	    // console.log(this.User);
	    // console.log(this.realms);

	    this.firstname = this.User!.firstname;
	    this.lastname = this.User!.lastname;
	    this.username = this.User!.userName;
	    this.location = this.User!.location;
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.profile {
	@include pageBackground;

	display: flex;
	flex-direction: column;
}

.profile-header {
	display: flex;
	justify-content: center;
	font-size: 1.4em;
	padding-bottom: 10px;
	box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.95);
	user-select: none;
}

.profile-container {
	overflow-y: auto;
}

.profile-content {
	width: 100%;
	display: grid;
	grid-template-columns: 50% 50%;
	justify-content: center;
	margin-top: 1em;
	padding-right: 1em;
}

label {
	margin: 0;
	text-indent: 5px;
	display: block;
}

input {
	display: block;
	width: 100%;
	background-color: rgba(255, 255, 255, 0.15);
	border: 1px solid rgba(0, 0, 0, 0.95);
	text-indent: 5px;
	color: #fff;
}

.profile-content-password {
	width: 100%;
	padding-right: 1em;
	display: grid;
	grid-template-columns: 50% 50%;
	grid-template-areas:
		'p .'
		'n c';
}

#password {
	grid-area: p;
}

#new-password {
	grid-area: n;
}

#confirm-new-password {
	grid-area: c;
}

.list-unstyled {
	font-size: 0.85em;
}

.profile-entry {
	width: 100%;
	display: flex;
	flex-direction: column;
	color: #fff;
}

.profile-buttons {
	padding-right: 1em;
	width: 100%;
}

.profile-general {
	width: 100%;
	padding-top: 3em;
	padding-right: 1em;
	text-indent: 7px;
}

.account-information {
	display: grid;
	grid-template-columns: repeat(2, 50%);

	& #title {
		font-size: 1.05em;
		border-bottom: 1px solid rgba(255, 255, 255, 0.15);
		margin-top: 15px;
	}

	& #value {
		font-size: 0.9em;
	}
}

.profile-stats {
	width: 100%;
	padding-top: 3em;
	padding-right: 1em;
	display: grid;
	grid-template-columns: 50% 50%;
}

.profile-stats-roles {
	border: 1px solid rgba(255, 255, 255, 0.15);
	text-indent: 7px;
}

.profile-stats-title {
	font-size: 1.25em;
	border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}

.profile-stats-entry {
	display: flex;
	flex-direction: row;

	& #realm {
		width: 50%;
		text-align: left;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	& #rank {
		width: 50%;
		padding-right: 5px;
		text-align: right;
	}
}
</style>
