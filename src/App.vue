<template>
  <div id="background">
    <TitleBar />
    <Logo />

    <div class="main">
      <div class="content_toggle" @click="ToggleContent">
        testtesttest
        <img src="@/assets/images/gear_white.png" />
      </div>

      <div id="main_content">
        <Navigation :IsLoggedIn="IsLoggedIn" style="margin-right: 10px;" />
        <router-view :IsLoggedIn="IsLoggedIn"></router-view>
      </div>
    </div>

    <Footer />

    <!-- modals -->
    <Settings />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ConfigModule } from "@/store/modules/config/config.store";

import TitleBar from "@/components/TitleBar.vue";
import Logo from "@/components/Logo.vue";
import Footer from "@/components/Footer.vue";
import Settings from "@/components/Settings.vue";
import Navigation from "@/components/Navigation.vue";
import { UserModule } from "./store/modules/user/user.store";
import { ipcRenderer } from "electron";

@Component({
  components: { TitleBar, Logo, Footer, Settings, Navigation }
})
export default class App extends Vue {
  get IsLoggedIn() {
    return UserModule.IsLoggedIn;
  }

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

  async ToggleContent() {
    // const mainContent = document.getElementById("main_content") as HTMLElement;
    // mainContent.classList.toggle("hidden");
    ipcRenderer.send("restart_app");
  }

  created() {
    ipcRenderer.on("update_available", () => {
      ipcRenderer.removeAllListeners("update_available");
      console.log("A new update is available. Downloading now...");
    });
    ipcRenderer.on("update_downloaded", () => {
      ipcRenderer.removeAllListeners("update_downloaded");
      console.log(
        "Update Downloaded. It will be installed on restart. Restart now?"
      );
      ipcRenderer.send("restart_app");
    });
  }
}
</script>

<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap.scss";
@import "node_modules/bootstrap-vue/src/index.scss";
@import "@/assets/styles/main.scss";
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/buttons.scss";

#background {
  background: url("~@/assets/images/background_tirion.png");
  height: 100%;
  width: 100%;
  background-position: top center;
  background-repeat: no-repeat;
  background-size: cover;
}

.main {
  height: calc(100% - #{$footerHeight});
  width: 100%;
  padding: 115px 30px 35px 30px;
}

#main_content {
  background: rgba(0, 0, 0, 0.5);
  border-radius: 6px;
  height: 100%;
  width: 100%;
  padding: 10px 15px 10px 15px;
  color: #fff;

  display: grid;
  grid-template-columns: 25% 75%;
}

.hidden {
  display: none !important;
}

.content_toggle {
  position: fixed;
  top: 30px;
  right: 50px;
  img {
    height: 20px;
    width: 20px;
  }
}
</style>
