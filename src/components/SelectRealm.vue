<template>
    <b-modal
        id="select-realm"
        size="md"
        centered
        title="Select Realm"
        header-class="text-dark text-center w-100"
        body-class="text-dark"
        footer-class="text-dark"
        hide-footer
        hide-header-close
        no-close-on-backdrop
        no-close-on-esc>
        <div class="mb-3">
            <p>It is required to choose what realm you wish to play at, so we know what patches to download before you start playing.</p>
        </div>
        <div v-if="realms.length > 0">
            <div v-for="realm in realms" :key="realm.id">
                <button class="button realm-button" :class="{ 'button-orange': realm === selectedRealm}" @click="SelectRealm(realm)" :disabled="loading">
                    {{ realm.name }}
                </button>
            </div>
        </div>
    </b-modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RealmsModule } from '@/store/modules/realms/realms.store';
import { IRealmModel } from '@/models/realms/RealmModel';
import { ConfigModule } from '@/store/modules/config/config.store';
@Component({
    components: {}
})
export default class SelectRealm extends Vue {
    private loading: boolean = false;

    get realms() {
        return RealmsModule.realms;
    }

    get selectedRealm() {
        return RealmsModule.realms.find(x => x.id === ConfigModule.config!.selectedRealm);
    }

    async SelectRealm(realm: IRealmModel) {
        this.loading = true;

	    ConfigModule.SetSelectedRealm(realm.id);

        try {
            await ConfigModule.SynchronizePatchSettings();
            await ConfigModule.SaveConfig();
	        this.$bvModal.hide('select-realm');
        } finally {
            this.loading = false;
        }
	}
}
</script>

<style lang="scss" scoped>
.realm-button {
	display: block;
	width: 100%;
	height: 50px;
	font-size: 1.25rem;

	margin-bottom: 0.5em;
}
</style>
