<template>
  <div class="profile">Profile</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IApplicationUser } from "@/models/user/user.model";
import { UserModule } from "@/store/modules/user/user.store";

@Component({
  components: {}
})
export default class UserProfile extends Vue {
  get User(): IApplicationUser | null {
    return UserModule.user;
  }

  created() {
    console.log(this.User);
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.profile {
  @include pageBackground;
  padding: 1em;
}
</style>
