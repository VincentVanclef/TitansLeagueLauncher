<template>
    <b-modal id="app-info-component" centered title="App Information" ok-title="Ok"
             ok-only>
        <template v-slot:modal-footer="{ ok }">
            <div class="settings_footer">
                <button
                    class="text-center button button-orange"
                    :class="{ disabled: IsInDevelopmentMode }"
                    style="height: 40px; width: 200px; font-size: 1em;"
                    :disabled="IsInDevelopmentMode"
                    @click="CheckForUpdates()">
                    Check For Updates
                </button>
                <div class="text-center button button-blue" style="height: 40px; width: 100px; font-size: 1em;" @click="ok()">
                    Ok
                </div>
            </div>
        </template>

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
import { Component, Prop, Vue } from 'vue-property-decorator';
import electron from 'electron';
import { autoUpdater } from 'electron-updater';
@Component({
    components: {}
})
export default class AppInfoComponent extends Vue {
    get IsInDevelopmentMode() {
        return process.env.NODE_ENV !== 'production';
    }

    get AppVersion() {
        return electron.remote.app.getVersion();
    }

    async CheckForUpdates() {
        const result = await autoUpdater.checkForUpdates();
        alert(result);
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

.settings_footer {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
</style>
