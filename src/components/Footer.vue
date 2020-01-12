<template>
  <div class="footer">
    <div class="footer_item" @click="Website">
      <div class="button button-blue select_folder_button">
        Website
      </div>
    </div>
    <div class="footer_item">
      <div @click="Settings" class="button button-dark select_folder_button">
        Settings
      </div>
    </div>
    <div class="footer_item"></div>
    <div class="footer_item"></div>
    <div class="footer_item">
      <div
        v-if="!IsWoWDirectoryValid"
        class="button button-orange play_button"
        @click="SelectFolder"
      >
        Select Folder
      </div>
      <div v-else class="button button-orange play_button" @click="StartGame">
        Start Game
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ApplicationConfig, RealmlistConfig } from "@/core/constants";
import { ConfigModule } from "@/store/modules/config/config.store";
import FileService from "@/services/fileService/file.service";

@Component
export default class Footer extends Vue {
  async SelectFolder(e: Event) {
    e.preventDefault();
    const result = await ConfigModule.SelectWoWPath();
    if (!result) {
      this.$bvModal.msgBoxOk(
        "Please select your World of Warcraft directory.",
        {
          centered: true,
          noCloseOnBackdrop: true,
          noCloseOnEsc: true
        }
      );
    }
  }

  Website(e: Event) {
    e.preventDefault();
    require("electron").shell.openExternal(ApplicationConfig.WebsiteURL);
  }

  Settings(e: Event) {
    e.preventDefault();
    this.$bvModal.show("settings-component");
  }

  get IsWoWDirectoryValid(): boolean {
    return ConfigModule.isWoWDirectoryValid;
  }

  async StartGame() {
    if (ConfigModule.config!.autoResetRealmlist) {
      await ConfigModule.ResetRealmlist();
    }
    if (ConfigModule.config!.autoClearCache) {
      await ConfigModule.ClearCache();
    }
    const closed = await FileService.ExecuteFile(
      ConfigModule.config!.wowPath + "\\Wow.exe"
    );
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.footer::before {
  @include background;
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

[data-title]:hover::after,
[data-title]:focus::after {
  content: attr(data-title);
  position: absolute;
  left: 50%;
  top: -50px;
  transform: translateX(-50%);
  width: auto;
  white-space: nowrap;
  background: #282828;
  color: #fff;
  border-radius: 4px;
  box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.4);
  font-size: 13px;
  padding: 8px;
  border-style: solid;
  border-color: #282828 transparent transparent transparent;
}
</style>
