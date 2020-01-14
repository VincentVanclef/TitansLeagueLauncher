<template>
  <div class="server-status">
    <div class="server-header">Server Status</div>
    <div class="server-status-container">
      <div class="realm pt-2" v-for="realm in realms" :key="realm.id">
        <div
          id="name"
          :class="{ online: realm.online, offline: !realm.online }"
          @click="ToggleRealm(realm.id)"
        >
          {{ realm.name }}
        </div>
        <div
          class="realm-data hidden"
          v-if="realm.online"
          :id="`realm-${realm.id}`"
        >
          <div id="header">Online Players</div>
          <div id="sub-header">
            <small
              >Total Online
              <font color="magneto">{{ TotalOnline(realm.id) }}</font></small
            >
            <small
              >Alliance Online
              <font color="teal">{{ AllianceOnline(realm.id) }}</font></small
            >
            <small
              >Horde Online
              <font color="red">{{ HordeOnline(realm.id) }}</font></small
            >
          </div>
          <div class="realm-data-players">
            <div id="title">
              <div @click="SortBy('name')">Name</div>
              <div>Class</div>
              <div>Race</div>
              <div>Faction</div>
              <div>Level</div>
              <div>Map</div>
            </div>
            <div
              id="data"
              v-for="player in realm.onlinePlayers"
              :key="player.name"
            >
              <div class="player-name">
                <font :color="GetClassColor(player.class)">{{
                  player.name
                }}</font>
              </div>
              <div>
                <img
                  class="online-image"
                  :src="
                    require('@/assets/images/class/' + player.class + '.gif')
                  "
                />
              </div>
              <div>
                <img
                  class="online-image"
                  :src="
                    require('@/assets/images/race/' +
                      player.race +
                      '-' +
                      player.gender +
                      '.gif')
                  "
                />
              </div>
              <div>
                <img
                  class="online-image"
                  :src="require('@/assets/images/' + GetFaction(player.race))"
                />
              </div>
              <div>{{ player.level }}</div>
              <div class="player-zone" :title="GetZoneName(player.zone)">
                {{ GetZoneName(player.zone) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IRealmModel } from "@/models/realms/RealmModel";
import { HelperMethods } from "../core/HelperMethods";
import { WoWClass } from "../models/game/WoWClasses";
import { GameRoles } from "../core/Constants";
import { WoWRaces } from "../models/game/WoWRaces";

@Component({
  components: {}
})
export default class ServerStatus extends Vue {
  @Prop() realms!: IRealmModel[];

  GetDate(date: Date) {}

  TotalOnline(id: number) {
    const realm = this.realms.find(r => r.id == id);
    if (!realm) return 0;
    return realm.online ? realm.onlinePlayers.length : 0;
  }

  AllianceOnline(id: number) {
    const realm = this.realms.find(r => r.id == id);
    if (!realm) return 0;
    const data = realm.onlinePlayers.filter(x =>
      HelperMethods.IsAlliance(x.race)
    );
    return realm.online ? data.length : 0;
  }

  HordeOnline(id: number) {
    const realm = this.realms.find(r => r.id == id);
    if (!realm) return 0;
    const data = realm.onlinePlayers.filter(x => HelperMethods.IsHorde(x.race));
    return realm.online ? data.length : 0;
  }

  GetZoneName(zoneId: number) {
    return HelperMethods.GetZone(zoneId);
  }

  GetFaction(race: WoWRaces) {
    if (HelperMethods.IsHorde(race)) {
      return "horde_min.png";
    }
    return "alliance_min.png";
  }

  GetClassColor(classId: WoWClass) {
    return HelperMethods.GetClassColor(classId);
  }

  GetGameRankColor(rank: GameRoles) {
    return HelperMethods.GetGameRankColor(rank);
  }

  GetGameRankName(rank: GameRoles) {
    return HelperMethods.GetGameRankName(rank, true);
  }

  ToggleRealm(id: number) {
    const realm = document.getElementById(`realm-${id}`) as HTMLElement;
    realm.classList.toggle("hidden");
  }

  created() {}
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.server-status {
  @include pageBackground;
  display: flex;
  flex-direction: column;
  user-select: none;
}

.server-header {
  display: flex;
  justify-content: center;
  font-size: 1.4em;
  padding-bottom: 10px;
  margin-bottom: 20px;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.95);
}

.server-status-container {
  overflow-y: auto;
}

.realm {
  display: flex;
  flex-direction: column;

  #name {
    font-size: 1.25em;
    text-align: center;
    box-shadow: 0 0 3px #333;
    border-radius: 6px;
    padding: 15px;
    letter-spacing: 0.1em;
    user-select: none;
    cursor: pointer;
    margin-right: 7px;
    margin-left: 7px;

    &.online {
      filter: drop-shadow(0 0 1mm green);
    }

    &.offline {
      filter: drop-shadow(0 0 3mm red);
    }
  }
}

$gridColumns: 20% repeat(4, 15%) auto;

.realm-data {
  margin-top: 0.5em;
  padding: 5px;

  max-height: 100%;
  transform: scaleY(1);
  transform-origin: top;
  opacity: 1;
  transition: all 0.5s ease-in-out;

  #header {
    text-align: center;
    font-size: 1.1em;
    margin-bottom: 10px;
  }

  #sub-header {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 5px;
  }

  .realm-data-players {
    display: flex;
    flex-direction: column;
    border-right: 1px solid #333;
    border-left: 1px solid #333;
    box-shadow: 0 0 3px #333;

    #title {
      display: grid;
      grid-template-columns: $gridColumns;
      text-align: center;
      font-size: 0.85em;
      border-top: 1px solid #333;
      border-bottom: 1px solid #333;

      *:first-child {
        border-left: 1px solid #333;
      }

      * {
        border-right: 1px solid #333;
      }
    }

    #data {
      display: grid;
      grid-template-columns: $gridColumns;
      text-align: center;
      font-size: 0.7em;
      border-bottom: 1px solid #333;

      padding: 5px;
    }
  }
}

.player-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.player-zone {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.online-image {
  height: 18px;
  width: 18px;
}

.hidden {
  max-height: 0;
  opacity: 0;
  transform: scaleY(0);
}
</style>
