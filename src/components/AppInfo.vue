<template>
  <b-modal
    id="app-info-component"
    centered
    title="App Information"
    ok-title="Ok"
    ok-only
  >
    <b-row class="font-weight-bold">
      <b-col>
        <p class="app-info-entry">
          Version <span class="float-right">{{ AppVersion }}</span>
        </p>
        <p class="app-info-entry">
          Author <span class="float-right">Vincent Vanclef</span>
        </p>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import electron from "electron";

@Component({
  components: {}
})
export default class AppInfoComponent extends Vue {
  get AppVersion() {
    return electron.remote.app.getVersion();
  }
}
</script>

<style lang="scss" scoped>
.app-info-entry {
  position: relative;
  background-image: linear-gradient(black, black);
  background-size: 100% 1px, auto;
  background-repeat: no-repeat;
  background-position: center bottom;
}
</style>
