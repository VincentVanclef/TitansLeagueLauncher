<template>
    <b-modal id="settings-component" centered title="Settings" ok-title="Save"
             ok-only @ok="SaveSettings()" @show="SyncSettings()">
        <template v-slot:modal-footer="{ ok }">
            <div class="settings_footer">
                <button class="text-center button button-orange" style="height: 40px; width: 190px; font-size: 0.9em;" @click="SelectFolder">
                    Select WoW Folder
                </button>
                <button class="text-center button button-blue" style="height: 40px; width: 150px; font-size: 0.9em;" @click="selectRealm()">
                    Change Realm
                </button>
                <button class="text-center button button-green" style="height: 40px; width: 100px; font-size: 1em;" @click="ok()">
                    Save
                </button>
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
                    Cleanup unusued patches
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
                <div class="settings_item">
                    |
                </div>
            </b-col>
            <b-col cols="2" class="d-flex flex-column justify-content-end">
                <div class="settings_entry">
                    <b-form-checkbox v-model="settings.autoResetRealmlist" switch size="lg"/>
                </div>
                <div class="settings_entry">
                    <b-form-checkbox v-model="settings.autoClearCache" switch size="lg"/>
                </div>
                <div class="settings_entry">
                    <b-form-checkbox v-model="settings.autoCheckForUpdates" switch size="lg"/>
                </div>
                <div class="settings_entry">
                    <b-form-checkbox v-model="settings.removeUnusedPatches" switch size="lg"/>
                </div>
                <div class="settings_entry">
                    <b-form-checkbox v-model="settings.enableLogs" switch size="lg"/>
                </div>
            </b-col>
        </b-row>
        <hr>
        <b-row v-if="settings">
            <p class="pl-3 font-weight-bold mb-2">
                Patch Update Settings ({{selectedRealm.name}})
            </p>
            <template v-for="config in patchConfig">
                <b-col :key="config.patch + 1" cols="9">
                    <div class="settings_item">
                        <p>{{ config.patch }} <span>({{ config.size }}mb)</span></p>
                        <small><p>{{ config.details }}</p></small>
                    </div>
                </b-col>
                <b-col :key="config.patch + 2" cols="1">
                    <div class="settings_item">
                        |
                    </div>
                </b-col>
                <b-col :key="config.patch + 3" cols="2" class="d-flex flex-column-reverse justify-content-end">
                    <div class="settings_entry">
                        <b-form-checkbox v-model="config.keepUpdated" switch size="lg" :disabled="!settings.autoCheckForUpdates"/>
                    </div>
                </b-col>
            </template>
        </b-row>
        <AppInfoComponent/>
    </b-modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ConfigModule } from '@/store/modules/config/config.store';
import { IConfiguration, IPatchConfig } from '@/core/constants';
import LogService from '../services/logs/log.service';

import AppInfoComponent from './AppInfo.vue';
import { RealmsModule } from '@/store/modules/realms/realms.store';

@Component({
    components: { AppInfoComponent }
})
export default class SettingsComponent extends Vue {
	settings: IConfiguration | null = null;

    get patchConfig() {
        return this.settings?.patchConfig.filter(x => x.realmId === this.selectedRealm?.id) ?? [];
    }

	AppInfo() {
	    this.$bvModal.show('app-info-component');
	}

	async SelectFolder(e: Event) {
	    e.preventDefault();
	    const result = await ConfigModule.SelectWoWPath();
	    if (!result) {
	        this.$bvModal.msgBoxOk('Please select your World of Warcraft directory.', {
	            centered: true,
	            noCloseOnBackdrop: true,
	            noCloseOnEsc: true
	        });
	    }
	}

	async SaveSettings() {
	    try {
	        await ConfigModule.SaveConfig(this.settings);
	    } catch (e) {
	        LogService.Log('SaveSettings', e);
	        this.$bvToast.toast(e, {
	            title: 'Error',
	            variant: 'danger'
	        });
	        return;
	    }
	    this.$bvModal.msgBoxOk('Settings saved successfully', {
	        centered: true,
	        noCloseOnBackdrop: true,
	        noCloseOnEsc: true
	    });
	}

    get selectedRealm() {
        return RealmsModule.realms.find(x => x.id === ConfigModule.config!.selectedRealm);
    }
    
    selectRealm() {
		this.$bvModal.show('select-realm');
	}

	async SyncSettings() {
	    await ConfigModule.SynchronizePatchSettings();
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

.settings_footer {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
</style>
