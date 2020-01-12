<template>
  <b-modal
    id="settings-component"
    centered
    title="Settings"
    ok-title="Save"
    ok-only
    @ok="SaveSettings()"
    @show="SyncSettings()"
  >
    <template v-slot:modal-footer="{ ok }">
      <div class="w-100">
        <div
          class="float-left button button-orange"
          style="height: 40px; width: 200px; font-size: 1em;"
          @click="SelectFolder"
        >
          Select WoW Folder
        </div>
        <div
          class="float-right button button-green"
          style="height: 40px; width: 90px; font-size: 1em;"
          @click="ok()"
        >
          Save
        </div>
      </div>
    </template>

    <b-row v-if="settings">
      <b-col cols="9">
        <div class="settings_item">
          Reset realmlist automatically
        </div>
        <div class="settings_item">
          Reset cache automatically
        </div>
        <div class="settings_item">
          Automatically detect updates
        </div>
        <div class="settings_item">
          Enable Logging (Debug)
        </div>
      </b-col>
      <b-col cols="1">
        <div class="settings_item">
          |
        </div>
        <div class="settings_item">
          |
        </div>
        <div class="settings_item">
          |
        </div>
        <div class="settings_item">
          |
        </div>
      </b-col>
      <b-col cols="2" class="d-flex flex-column justify-content-end">
        <div class="settings_entry">
          <b-form-checkbox
            v-model="settings.autoResetRealmlist"
            switch
            size="lg"
          >
          </b-form-checkbox>
        </div>
        <div class="settings_entry">
          <b-form-checkbox v-model="settings.autoClearCache" switch size="lg">
          </b-form-checkbox>
        </div>
        <div class="settings_entry">
          <b-form-checkbox
            v-model="settings.autoCheckForUpdates"
            switch
            size="lg"
          >
          </b-form-checkbox>
        </div>
        <div class="settings_entry">
          <b-form-checkbox v-model="settings.enableLogs" switch size="lg">
          </b-form-checkbox>
        </div>
      </b-col>
    </b-row>
    <hr />
    <b-row v-if="settings">
      <p class="pl-3 font-weight-bold">Patch Update Settings</p>
      <template v-for="config in settings.patchConfig">
        <b-col cols="9" :key="config.patch + 1">
          <div class="settings_item">
            {{ config.patch }}
            <small
              ><p>{{ config.details }}</p></small
            >
          </div>
        </b-col>
        <b-col cols="1" :key="config.patch + 2">
          <div class="settings_item">
            |
          </div>
        </b-col>
        <b-col
          cols="2"
          class="d-flex flex-column-reverse justify-content-end"
          :key="config.patch + 3"
        >
          <div class="settings_entry">
            <b-form-checkbox
              v-model="config.keepUpdated"
              switch
              size="lg"
              :disabled="!settings.autoCheckForUpdates"
            >
            </b-form-checkbox>
          </div>
        </b-col>
      </template>
    </b-row>
  </b-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ConfigModule } from "@/store/modules/config/config.store";
import { IConfiguration, IPatchConfig } from "@/core/constants";
import PatchService from "@/services/patches/patch.service";
import LogService from "../services/logs/log.service";

@Component({
  components: {}
})
export default class SettingsComponent extends Vue {
  settings: IConfiguration | null = null;

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

  async SaveSettings() {
    try {
      await ConfigModule.SaveConfig(this.settings);
    } catch (e) {
      LogService.Log("SaveSettings", e);
      this.$bvToast.toast(e, {
        title: "Error",
        variant: "danger"
      });
      return;
    }
    this.$bvModal.msgBoxOk("Settings saved successfully", {
      centered: true,
      noCloseOnBackdrop: true,
      noCloseOnEsc: true
    });
  }

  async SyncSettings() {
    if (ConfigModule.config) this.settings = ConfigModule.config;

    // Check for new stuff
    let patches: IPatchConfig[] = [];
    try {
      patches = await PatchService.GetPatchConfig();
    } catch (e) {
      LogService.Log("GetPatchConfig", e);
    }
    if (patches.length === 0) {
      this.settings!.patchConfig = [];
      return;
    }

    for (const patch of patches) {
      const exists = this.settings!.patchConfig.find(
        x => x.patch === patch.patch
      );
      if (!exists) {
        this.settings!.patchConfig.push(patch);
      } else {
        exists.details = patch.details;
      }
    }

    // Check for deleted stuff
    for (const patch of this.settings!.patchConfig) {
      const val = patch.keepUpdated as any;
      if (val === 1 || val === 0) {
        patch.keepUpdated = val === 1 ? true : false;
      }

      let index = patches.findIndex(x => x.patch === patch.patch);
      if (index < 0) {
        index = this.settings!.patchConfig.findIndex(
          x => x.patch === patch.patch
        );
        this.settings!.patchConfig.splice(index, 1);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.settings_item {
  display: block;
  margin-bottom: 0.5em;
}

.settings_entry {
  display: block;
  margin-bottom: 0.5em;
  padding-left: 15px;
}
</style>
