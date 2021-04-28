<template>
    <div id="window-logo">
        <img src="@/assets/images/logo.png">
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Logo extends Vue {}
</script>

<style lang="scss" scoped>
$logoSize: 100px;

#window-logo {
	position: fixed;
	top: 5px;
	left: calc(50% - #{$logoSize} / 2);
	z-index: 1;
	filter: drop-shadow(0 0.5rem 1rem #06213c);

	-webkit-app-region: drag;

	img {
		height: $logoSize;
		width: $logoSize;
	}
}
</style>
