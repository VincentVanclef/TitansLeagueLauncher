<template>
  <div class="footer"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Footer extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.footer {
  height: $footerHeight;
  background: linear-gradient(#06213c, #1e5898);
  box-shadow: 0px -5px 5px 0px rgba(0, 0, 0, 0.75);
  opacity: 0.8;
  border-top: 1px solid rgba(255, 255, 255, 0.75);
}
</style>
