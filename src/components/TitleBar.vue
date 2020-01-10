<template>
  <div class="titlebar">
    <div id="drag-region">
      <div id="window-title">
        <span>Titans-League Launcher</span>
      </div>
      <div id="window-controls">
        <div class="button" id="min-button" @click="Minimize()">
          <span>&#xE921;</span>
        </div>
        <div class="button" id="close-button" @click="Close()">
          <span>&#xE8BB;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
const remote = require("electron").remote;
const window = remote.getCurrentWindow();

@Component
export default class TitleBar extends Vue {
  Minimize() {
    window.minimize();
  }

  Close() {
    window.close();
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.scss";

.titlebar {
  display: block;
  position: fixed;
  top: 0;
  height: $titlebarHeight;
  width: 100%;
  background: linear-gradient(#06213c, #1e5898);
  color: #fff;

  box-shadow: -2px 3px 5px 0px rgba(0, 0, 0, 0.5);
  opacity: 0.85;
}

#drag-region {
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 30% 40% 30%;

  -webkit-app-region: drag;
}

#window-title {
  grid-column: 1;
  display: flex;
  align-items: center;
  margin-left: 8px;
  overflow-x: hidden;
  font-family: "Segoe UI", sans-serif;
  font-size: 15px;
  font-weight: bold;
  user-select: none;
}

#window-title span {
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
}

#window-controls {
  display: grid;
  grid-template-columns: repeat(2, 46px);
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  font-family: "Segoe MDL2 Assets";
  font-size: 10px;

  -webkit-app-region: no-drag;
}

#window-controls .button {
  grid-row: 1 / span 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  user-select: none;
  cursor: default;
}

#window-controls .button:hover {
  background: rgba(255, 255, 255, 0.1);
}
#window-controls .button:active {
  background: rgba(255, 255, 255, 0.2);
}

#window-controls #min-button {
  grid-column: 1;
}

#window-controls #close-button {
  grid-column: 2;
}
</style>
