<template>
    <div class="titlebar">
        <div id="drag-region">
            <div id="window-title">
                <span>Titans-League Launcher</span>
            </div>
			<div></div>
            <div id="window-controls">
				<div class="selected-realm">
					<p v-if="selectedRealm">
						{{ selectedRealm.name }}
					</p>
				</div>
				<div class="app-controls">
					<div id="min-button" class="title_button" @click="Minimize()">
						<span>&#xE921;</span>
					</div>
					<div id="close-button" class="title_button" @click="Close()">
						<span>&#xE8BB;</span>
					</div>
				</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ConfigModule } from '@/store/modules/config/config.store';
import { RealmsModule } from '@/store/modules/realms/realms.store';
import { Component, Prop, Vue } from 'vue-property-decorator';
const remote = require('electron').remote;
const window = remote.getCurrentWindow();

@Component
export default class TitleBar extends Vue {
    Minimize() {
        window.minimize();
    }

	get selectedRealm() {
        return RealmsModule.realms.find(x => x.id === ConfigModule.config!.selectedRealm);
    }

    Close() {
        window.close();
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.selected-realm {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;

	font-size: 15px;
	font-weight: bold;
	user-select: none;
	margin-left: 30px;
	font-size: 17px;

	user-select: none;

	flex: 1;
}

.titlebar::before {
	content: '';
	position: absolute;
	background: linear-gradient(#06213c, #1e5898);
	opacity: 0.8;
	z-index: -1;
	height: 100%;
	width: 100%;
}

.titlebar {
	display: block;
	position: fixed;
	top: 0;
	height: $titlebarHeight;
	width: 100%;
	color: #fff;

	box-shadow: -2px 3px 5px 0px rgba(0, 0, 0, 0.5);
}

#drag-region {
	width: 100%;
	height: 100%;

	display: grid;
	grid-template-columns: 1fr 110px 1fr;

	-webkit-app-region: drag;
}

#window-title {
	grid-column: 1;
	display: flex;
	align-items: center;
	margin-left: 8px;
	overflow-x: hidden;
	font-size: 15px;
	font-weight: bold;
	user-select: none;
}

#window-title span {
	overflow: hidden;
	text-overflow: ellipsis;
	line-height: 1.5;
}

#window-controls {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;
	font-size: 10px;

	.app-controls {
		display: flex;
		align-items: center;
		font-family: 'Segoe MDL2 Assets';

		height: 100%;

		-webkit-app-region: no-drag;
	}
}

#window-controls .title_button {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 50px;

	user-select: none;
	cursor: pointer;
}

#window-controls .title_button:hover {
	background: rgba(255, 255, 255, 0.1);
}
#window-controls .title_button:active {
	background: rgba(255, 255, 255, 0.2);
}
</style>
