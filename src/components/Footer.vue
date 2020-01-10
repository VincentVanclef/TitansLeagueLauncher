<template>
  <div class="footer">
    <div class="footer_item">
      <div class="button button-orange select_folder_button">
        Select Folder
      </div>
    </div>
    <div class="footer_item">
      <div class="button button-blue select_folder_button">
        Website
      </div>
    </div>
    <div class="footer_item"></div>
    <div class="footer_item"></div>
    <div class="footer_item">
      <div class="button button-orange play_button">Start Game</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Footer extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.footer::before {
  content: "";
  position: absolute;
  background: linear-gradient(#06213c, #1e5898);
  opacity: 0.8;
  z-index: -1;
  height: 100%;
  width: 100%;
}

.footer {
  height: $footerHeight;

  border-top: 2px solid rgba(0, 0, 0, 0.75);

  display: grid;
  grid-template-columns: repeat(5, 20%);

  color: #fff;
  filter: drop-shadow(0 -2mm 2mm #1e5898);
}

.footer_item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.play_button {
  width: 80%;
  height: 60%;
}

.select_folder_button {
  width: 80%;
  height: 60%;
}
</style>
