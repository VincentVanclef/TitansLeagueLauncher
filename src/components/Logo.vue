<template>
  <div id="window-logo">
    <img
      src="@/assets/images/logo.png"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Logo extends Vue {}
</script>

<style lang="scss" scoped>
#window-logo {
  position: fixed;
  top: 5px;
  left: 45%;
  z-index: 1;
  opacity: 0.8;

  -webkit-app-region: drag;

  img {
    height: 100px;
    width: 100px;
  }
}
</style>
