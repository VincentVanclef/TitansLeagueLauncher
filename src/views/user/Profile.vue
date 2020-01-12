<template>
  <div class="profile">Profile</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class UserProfile extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.profile {
  @include pageBackground;
  padding: 1em;
}
</style>
