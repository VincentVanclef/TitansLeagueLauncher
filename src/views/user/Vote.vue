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
import { Component, Prop, Vue } from "vue-property-decorator";
import { IApplicationUser } from "@/models/user/user.model";
import { UserModule } from "@/store/modules/user/user.store";
import { UserApi } from "@/services/api/api.user";
import { IVoteSite } from "@/models/user/vote/VoteSite";
import { IVoteTimer } from "@/models/user/vote/VoteTimer";
import moment from "moment";

@Component({
  components: {}
})
export default class Vote extends Vue {
  voteSites: IVoteSite[] = [];
  voteTimers: IVoteTimer[] = [];
  updateTimer: any = null;

  get User(): IApplicationUser | null {
    return UserModule.user;
  }

  async Vote(site: IVoteSite) {
    const result = await UserApi.Vote(site);

    window.open(site.link, "_blank");

    this.voteTimers.push({
      site: site.id,
      unsetTimer: result.unsetTime
    });

    UserModule.accountData!.vp = result.vp;
    UserModule.user!.totalVotes += 1;

    this.$bvToast.toast(
      `Succesfully voted for ${site.name}! You have been rewarded ${site.value} VP!`,
      {
        title: "Success",
        variant: "success",
        solid: true
      }
    );
  }

  async GetVoteSites() {
    const result = await UserApi.GetVoteSites();
    this.voteSites = result;
  }

  async GetVoteTimers() {
    const result = await UserApi.GetVoteTimers();
    this.voteTimers = result;
  }

  GetTimer(id: number) {
    let timer = this.GetSiteTimer(id);
    if (timer == 0) {
      return 0;
    }

    const then = moment(timer * 1000);
    const now = moment();
    return moment.utc(moment(then).diff(moment(now))).format("HH:mm:ss");
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
      .map(v => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
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
@import "@/assets/styles/variables.scss";

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
