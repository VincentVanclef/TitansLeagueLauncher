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

@Component({
  components: {}
})
export default class SettingsComponent extends Vue {
  settings: IConfiguration | null = null;

  async SaveSettings() {
    try {
      await ConfigModule.SaveConfig(this.settings);
    } catch (e) {
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
    const patches = await PatchService.GetPatchConfig();
    for (const patch of patches) {
      const exists = this.settings!.patchConfig.find(
        x => x.patch === patch.patch
      );
      if (!exists) {
        this.settings!.patchConfig.push(patch);
      }
    }

    // Check for deleted stuff
    for (const patch of this.settings!.patchConfig) {
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
