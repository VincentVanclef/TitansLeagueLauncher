<template>
  <div class="profile">
    <div class="profile-header">{{ User.firstname }} {{ User.lastname }}</div>
    <div class="profile-container">
      <form @submit.prevent="UpdateProfile">
        <div class="profile-content">
          <div class="profile-entry">
            <div class="mb-2">
              <label for="firstname">First name</label>
              <input name="firstname" type="text" v-model="firstname" />
            </div>
            <div class="mb-2">
              <label for="lastname">Nickname</label>
              <input name="lastname" type="text" v-model="username" />
            </div>
          </div>
          <div class="profile-entry">
            <div class="mb-2">
              <label for="lastname">Last name</label>
              <input name="lastname" type="text" v-model="lastname" />
            </div>
            <div class="mb-2">
              <label for="lastname">Location</label>
              <input name="lastname" type="text" v-model="location" />
            </div>
          </div>
        </div>
        <div class="profile-buttons">
          <button
            class="button button-green float-right"
            style="width: 140px; height: 30px; font-size: 0.8em;"
            type="submit"
          >
            Save Changes
          </button>
        </div>
      </form>
      <div class="profile-stats">
        <div class="profile-stats-roles">
          <div class="profile-stats-title">Website Roles</div>
          <ul class="list-unstyled pt-1">
            <li v-for="role in User.roles" :key="role">
              {{ role }}
            </li>
          </ul>
        </div>
        <div class="profile-stats-roles">
          <div class="profile-stats-title">Game Roles</div>
          <ul class="list-unstyled pt-1">
            <li v-for="role in User.account.accountAccess" :key="role.realmId">
              {{ GetRealmNameById(role.realmId) }}
              <span class="float-right mr-1">
                {{ GetGameRankName(role.gmlevel) }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IApplicationUser } from "@/models/user/user.model";
import { UserModule } from "@/store/modules/user/user.store";

import { IUpdateAccountRequest } from "@/models/user/requests/UpdateAccountRequest";
import { UserApi } from "@/services/api/user.api";
import { IRealmModel } from "@/models/realms/RealmModel";

import { HelperMethods } from "@/core/HelperMethods";

@Component({
  components: {}
})
export default class UserProfile extends Vue {
  @Prop() realms!: IRealmModel[];

  firstname: string = "";
  lastname: string = "";
  username: string = "";
  location: string = "";

  get User(): IApplicationUser | null {
    return UserModule.user;
  }

  async UpdateProfile() {
    const request: IUpdateAccountRequest = {
      firstname: this.firstname,
      lastname: this.lastname,
      username: this.username,
      location: this.location
    };

    await UserApi.UpdateAccount(request);

    this.$bvToast.toast(
      `Your profile informations have been successfully updated.`,
      {
        title: "Success",
        variant: "success",
        solid: true
      }
    );
  }

  GetRealmById(id: number) {
    return this.realms.find(x => x.id == id);
  }

  GetRealmNameById(id: number) {
    const realm = this.GetRealmById(id);
    return realm ? realm.name : "Unknown";
  }

  GetGameRankColor(rank: number) {
    return HelperMethods.GetGameRankColor(rank);
  }

  GetGameRankName(rank: number) {
    return HelperMethods.GetGameRankName(rank);
  }

  created() {
    console.log(this.User);
    console.log(this.realms);

    this.firstname = this.User!.firstname;
    this.lastname = this.User!.lastname;
    this.username = this.User!.username;
    this.location = this.User!.location;
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

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
</style>
