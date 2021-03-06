<template>
    <div id="background">
        <TitleBar/>
        <Logo/>

        <div class="main">
            <div id="main_content" ref="mainContent" class="open">
                <Navigation :is-logged-in="IsLoggedIn" style="margin-right: 10px;"/>
                <router-view :is-logged-in="IsLoggedIn" :realms="Realms"/>
            </div>
        </div>

        <Footer/>

        <!-- modals -->
        <Settings/>
        <SelectRealm/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ConfigModule } from '@/store/modules/config/config.store';

import TitleBar from '@/components/TitleBar.vue';
import Logo from '@/components/Logo.vue';
import Footer from '@/components/Footer.vue';
import Settings from '@/components/Settings.vue';
import SelectRealm from '@/components/SelectRealm.vue';
import Navigation from '@/components/Navigation.vue';
import { UserModule } from './store/modules/user/user.store';
import { IRealmModel } from './models/realms/RealmModel';
import { RealmsModule } from './store/modules/realms/realms.store';
import patchService from './services/patches/patch.service';

@Component({
    components: { TitleBar, Logo, Footer, Settings, Navigation, SelectRealm }
})
export default class App extends Vue {
    get Realms(): IRealmModel[] {
        return RealmsModule.realms;
    }

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

    get selectedRealm() {
        return RealmsModule.realms.find(x => x.id === ConfigModule.config!.selectedRealm);
    }

    created() {
        patchService.EnsureAIOIsInstalled();
    }
}
</script>

<style lang="scss">
@import 'node_modules/bootstrap/scss/bootstrap.scss';
@import 'node_modules/bootstrap-vue/src/index.scss';
@import '@/assets/styles/main.scss';
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/buttons.scss';

#background {
	background: url('~@/assets/images/background_tirion.png');
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

.open {
	opacity: 1 !important;
	max-height: 100% !important;
	transform: scale(1) !important;
}

#main_content {
	width: 100%;
	height: 100%;
	color: #fff;

	display: grid;
	grid-template-columns: 25% 75%;

	opacity: 0;
	transform: scale(0);
	transform-origin: top;
	transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}
</style>
