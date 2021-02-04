<template>
	<div class="vote">
		<div class="vote-site-header">
			<div class="vote-site-entry value">Site</div>
			<div class="vote-site-entry title">Value</div>
			<div class="vote-site-entry action">Time Left</div>
		</div>
		<div class="vote-site-content">
			<div class="vote-site" v-for="site in voteSites" :key="site.id">
				<div class="vote-site-entry image">
					<img :src="require('@/assets/images/vote-sites/' + site.image)" />
				</div>
				<div class="vote-site-entry title">{{ site.value }}</div>
				<div class="vote-site-entry action">
					<button class="button button-blue" v-if="GetSiteTimer(site.id)">
						{{ GetTimer(site.id) }}
					</button>
					<button class="button button-blue" v-else @click="Vote(site)">
						Vote Now
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserModule } from '@/store/modules/user/user.store';
import { UserApi } from '@/services/api/api.user';
import moment from 'moment';
import { UserViewObject, VoteSiteViewObject, VoteTimerViewObject } from '@/types/apiServerContract';

@Component({
	components: {}
})
export default class Vote extends Vue {
	private voteSites: VoteSiteViewObject[] = [];
	private voteTimers: VoteTimerViewObject[] = [];
	private updateTimer: any = null;
	private voting: boolean = false;

	get User(): UserViewObject | null {
		return UserModule.user;
	}

	async Vote(site: VoteSiteViewObject) {
	    if (this.voting) return;

	    try {
	        this.voting = true;

	        await UserModule.Vote(site);

	        window.open(site.link, '_blank');

	        this.$bvToast.toast(`After successfully voting on ${site.name}, you will be rewarded ${site.value} VP.`, {
	            title: 'Vote Verification Notice',
	            variant: 'warning',
	            solid: true
	        });
	    } finally {
	        this.voting = false;
	    }
	}

	async GetVoteSites() {
		const result = await UserApi.GetVoteSites();
		this.voteSites = result.voteSites;
	}

	async GetVoteTimers() {
		const result = await UserApi.GetVoteTimers();
		this.voteTimers = result.timers;
	}

	GetTimer(id: number) {
		let timer = this.GetSiteTimer(id);
		if (timer == 0) {
			return 0;
		}

		const then = moment(timer * 1000);
		const now = moment();
		return moment.utc(moment(then).diff(moment(now))).format('HH:mm:ss');
	}

	GetSiteTimer(id: number) {
		const site = this.voteTimers.find(timer => timer.site == id);
		return site ? site.unsetTimer : 0;
	}

	GetTimeLeft(id: number) {
		const timer = this.GetSiteTimer(id);
		if (timer == 0) {
			return 0;
		}
		const now = Math.floor(Date.now() / 1000);
		const diff = timer - now;
		return diff > 0 ? diff : 0;
	}

	GetTime(id: number) {
		const timeLeft = this.GetTimeLeft(id);
		const hours = Math.floor(timeLeft / 3600) % 24;
		const minutes = Math.floor(timeLeft / 60) % 60;
		const seconds = timeLeft % 60;
		return [hours, minutes, seconds]
			.map(v => (v < 10 ? '0' + v : v))
			.filter((v, i) => v !== '00' || i > 0)
			.join(':');
	}

	created() {
		this.GetVoteSites();
		this.GetVoteTimers();

		this.updateTimer = setInterval(() => {
			this.$forceUpdate();
		}, 1000);
	}

	beforeDestroy() {
		// Prevent memory leaks
		clearInterval(this.updateTimer);
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.vote {
	@include pageBackground;
	display: flex;
	flex-direction: column;
	user-select: none;
}

.vote-site-header {
	display: grid;
	grid-template-columns: repeat(3, 33.33%);
	padding-bottom: 10px;
	box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.95);
}

.vote-site-content {
	overflow-y: auto;
	position: relative;
	padding-top: 1em;
}

.vote-site {
	margin-bottom: 1.5em;
	display: grid;
	grid-template-columns: repeat(3, 33.33%);
}

.vote-site-entry {
	display: flex;
	justify-content: center;

	&.image,
	&.title,
	&.action {
		filter: drop-shadow(0 0 2mm #1e5898);
	}

	&.action {
		button {
			width: 110px;
		}
	}
}
</style>
