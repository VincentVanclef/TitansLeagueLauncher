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
  </b-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ConfigModule } from "@/store/modules/config/config.store";
import { IConfiguration } from "@/core/constants";

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

  SyncSettings() {
    if (ConfigModule.config) this.settings = ConfigModule.config;
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
