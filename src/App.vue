<template>
  <div id="background">
    <TitleBar />
    <Logo />

    <div id="main">
      <router-view></router-view>
    </div>

    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ConfigModule } from "@/store/modules/config/config.store";

import TitleBar from "@/components/TitleBar.vue";
import Logo from "@/components/Logo.vue";
import Footer from "@/components/Footer.vue";

@Component({
  components: { TitleBar, Logo, Footer }
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

  async SaveConfig() {
    await ConfigModule.SaveConfig();
  }

  created() {}
}
</script>

<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap.scss";
@import "node_modules/bootstrap-vue/src/index.scss";
@import "@/assets/styles/main.scss";
@import "@/assets/styles/variables.scss";

#background {
  background: url("~@/assets/images/background_tirion.png");
  height: 100%;
  width: 100%;
  background-position: top center;
  background-repeat: no-repeat;
  background-size: cover;
}

#main {
  height: calc(100% - #{$footerHeight});
  width: 100%;
}
</style>
