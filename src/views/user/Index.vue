<template>
    <router-view :is-logged-in="IsLoggedIn" :realms="realms"/>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IRealmModel } from '@/models/realms/RealmModel';

@Component({
    components: {}
})
export default class UserViewIndex extends Vue {
	@Prop() IsLoggedIn!: boolean;
	@Prop() realms!: IRealmModel[];
}
</script>
