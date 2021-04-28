<template>
    <div class="footer">
        <div class="footer_item" @click="Website">
            <button class="button button-blue select_folder_button">
                Website
            </button>
        </div>
        <div class="footer_item">
            <button class="button button-dark select_folder_button" @click="Settings">
                Settings
            </button>
        </div>
        <div class="footer_item">
            <ProgressBar v-if="AutoCheckUpdates" :percentage="percentage" :name="patchName"/>
        </div>
        <div class="footer_item">
			<button v-if="!selectedRealm" class="button button-orange play_button" @click="selectRealm">
                Select Realm
            </button>
            <button v-else-if="!IsWoWDirectoryValid" class="button button-orange play_button" @click="SelectFolder">
                Select Folder
            </button>
            <button v-else class="button button-orange play_button" :class="{ disabled: gameStarting }" @click="StartGame">
                Start Game
            </button>
        </div>

        <div ref="menu" class="menu open" @click="ToggleContent">
            <span class="menu-circle"></span>
            <a href="#" class="menu-link">
                <span class="menu-icon">
                    <span class="menu-line menu-line-1"></span>
                    <span class="menu-line menu-line-2"></span>
                    <span class="menu-line menu-line-3"></span>
                </span>
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ApplicationConfig } from '@/core/constants';
import { ConfigModule } from '@/store/modules/config/config.store';
import FileService from '@/services/fileService/file.service';
import PatchService from '@/services/patches/patch.service';

import ProgressBar from '@/components/ProgressBar.vue';
import LogService from '../services/logs/log.service';
import { RealmsModule } from '@/store/modules/realms/realms.store';

@Component({
    components: { ProgressBar }
})
export default class Footer extends Vue {
	patchName: string = '';
	percentage: number = 0;

	gameStarting: boolean = false;

	get selectedRealm() {
        return RealmsModule.realms.find(x => x.id === ConfigModule.config!.selectedRealm);
    }
	
	ToggleContent(e: Event) {
	    const content = document.getElementById('main_content') as HTMLElement;
	    content.classList.toggle('open');

	    const menu = this.$refs.menu as HTMLElement;
	    menu.classList.toggle('open');
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

	selectRealm() {
		this.$bvModal.show('select-realm');
	}

	Website(e: Event) {
	    e.preventDefault();
	    require('electron').shell.openExternal(ApplicationConfig.WebsiteURL);
	}

	Settings(e: Event) {
	    e.preventDefault();
	    this.$bvModal.show('settings-component');
	}

	get IsWoWDirectoryValid(): boolean {
	    return ConfigModule.isWoWDirectoryValid;
	}

	get AutoCheckUpdates(): boolean {
	    return ConfigModule.config != null && ConfigModule.config.autoCheckForUpdates;
	}

	async StartGame(e: Event) {
	    e.preventDefault();

		if (!this.selectedRealm) {
	    	this.$bvModal.show('select-realm');
			return;
		}

	    if (this.gameStarting) return;
	    this.gameStarting = true;

	    if (this.AutoCheckUpdates) {
	        try {
	            await PatchService.UpdatePatches((fileName: string, percentage: number) => {
	                this.patchName = fileName;
	                this.percentage = percentage;
	            });
	        } catch (e) {
	            LogService.Log('StartGame: UpdatePatches', e);
	        }
	    }

	    if (ConfigModule.config!.autoResetRealmlist) {
	        try {
	            await ConfigModule.ResetRealmlist();
	        } catch (e) {
	            LogService.Log('StartGame: ResetRealmlist', e);
	        }
	    }
		
	    if (ConfigModule.config!.autoClearCache) {
	        try {
	            await ConfigModule.ClearCache();
	        } catch (e) {
	            LogService.Log('StartGame: ClearCache', e);
	        }
	    }

	    this.gameStarting = false;

	    try {
	        FileService.ExecuteFile(ConfigModule.config!.wowPath + '\\Wow.exe');
	    } catch (e) {
	        LogService.Log('StartGame: ExecuteFile', e);
	    }

	    this.percentage = 0;
	    this.patchName = '';
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.footer::before {
	@include background;
}

.footer {
	position: relative;
	height: $footerHeight;

	border-top: 2px solid rgba(0, 0, 0, 0.75);

	display: grid;
	grid-template-columns: 20% 20% 40% 20%;

	color: #fff;
	filter: drop-shadow(0 -2mm 2mm #1e5898);
}

.footer_item {
	display: flex;
	justify-content: center;
	align-items: center;
}

.play_button {
	width: 80%;
	height: 60%;
}

.select_folder_button {
	width: 80%;
	height: 60%;
}

[data-title]:hover::after,
[data-title]:focus::after {
	content: attr(data-title);
	position: absolute;
	left: 50%;
	top: -50px;
	transform: translateX(-50%);
	width: auto;
	white-space: nowrap;
	background: #282828;
	color: #fff;
	border-radius: 4px;
	box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.4);
	font-size: 13px;
	padding: 8px;
	border-style: solid;
	border-color: #282828 transparent transparent transparent;
}

.menu {
	$menuSize: 35px;

	position: absolute;
	bottom: 70px;
	left: calc(50% - #{$menuSize} / 2);
	width: $menuSize;
	height: $menuSize;
	cursor: pointer;
	z-index: 2;
	border: 2px solid rgba(0, 0, 0, 0.75);
	border-radius: 60px;
	filter: drop-shadow(0 1mm 2mm #1e5898);
}

.menu-circle {
	background: $backgroundColor;
	width: 100%;
	height: 100%;
	position: absolute;
	border-radius: 50%;
	transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
	z-index: 1000;
}

.menu:hover .menu-circle {
	transform: scale(1.1);
}

.menu.open .menu-line-1 {
	transform: rotate(-45deg);
	transform: translateY(7px) translateY(-50%) rotate(-45deg);
}

.menu.open .menu-line-2 {
	opacity: 0;
}

.menu.open .menu-line-3 {
	transform: rotate(45deg);
	transform: translateY(-7px) translateY(50%) rotate(45deg);
}

.menu-link {
	width: 100%;
	height: 100%;
	position: absolute;
	z-index: 1002;
}

.menu-icon {
	position: absolute;
	width: 20px;
	height: 14px;
	margin: auto;
	left: 0;
	top: 0;
	right: 0;
	bottom: 1px;
}

.menu-line {
	background-color: rgba(255, 255, 255, 0.7);
	height: 2px;
	width: 100%;
	border-radius: 2px;
	position: absolute;
	left: 0;
	transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.menu-line-1 {
	top: 0;
}

.menu-line-2 {
	top: 0;
	bottom: 0;
	margin: auto;
}

.menu-line-3 {
	bottom: 0;
}
</style>
