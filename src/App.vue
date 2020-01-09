<template>
  <div class="main">
    <div class="loading_settings" v-if="SettingsLoading">
      Loading Settings
      <b-spinner variant="danger"></b-spinner>
    </div>
    <small v-if="Config"
      ><p>{{ Config }}</p></small
    >
    <small v-if="SettingsPath"
      ><p>{{ SettingsPath }}</p></small
    >
    <b-button variant="dark" @click="LoadConfig">Reload Config</b-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ConfigModule } from "@/store/modules/config/config.store";

@Component({
  components: {}
})
export default class App extends Vue {
  get SettingsLoading() {
    return ConfigModule.configSetupInProcess;
  }

  get Config() {
    return ConfigModule.config;
  }

  get SettingsPath() {
    return ConfigModule.settingsPath;
  }

  async LoadConfig() {
    await ConfigModule.LoadSettingsConfig();
  }

  created() {}
}
</script>

<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap.scss";
@import "node_modules/bootstrap-vue/src/index.scss";
@import "@/assets/styles/main.scss";
@import "@/assets/styles/variables.scss";

.main {
  height: 100%;
  width: 100%;
}

.loading_settings {
  @include center;
  font-size: 2em;
}
</style>
