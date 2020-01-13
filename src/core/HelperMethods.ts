import { WebsiteRoles, GameRoles } from "./constants";
import { WoWRaces, GetRaceName, GetRaceColor } from "@/models/game/WoWRaces";
import {
  WoWClass,
  GetClassName,
  GetClassColor
} from "@/models/game/WoWClasses";

export class HelperMethods {
  static GetRoleColor(role: WebsiteRoles): string {
    switch (role) {
      case WebsiteRoles.SuperAdmin:
        return "Purple";
      case WebsiteRoles.Admin:
        return "Red";
      case WebsiteRoles.Developer:
        return "Orange";
      case WebsiteRoles.Moderator:
        return "Blue";
    }
  }

  static GetGameRankName(rank: GameRoles, short: boolean = false) {
    switch (rank) {
      case GameRoles.Admin:
        return short ? "Admin" : "Admin";
      case GameRoles.GameMaster:
        return short ? "GM" : "GameMaster";
      case GameRoles.Trial:
        return short ? "Trial" : "Trial GameMaster";
      case GameRoles.Player:
        return short ? "Player" : "Player";
    }
  }

  static GetGameRankColor(rank: GameRoles) {
    switch (rank) {
      case GameRoles.Admin:
        return "Red";
      case GameRoles.GameMaster:
        return "Blue";
      case GameRoles.Trial:
        return "Teal";
      case GameRoles.Player:
        return "Green";
    }
  }

  static GetRaceName(raceId: WoWRaces): string {
    return GetRaceName(raceId);
  }

  static GetRaceColor(raceId: WoWRaces): string {
    return GetRaceColor(raceId);
  }

  static GetClassColor(classId: WoWClass): string {
    return GetClassColor(classId);
  }

  static GetClassName(classId: WoWClass): string {
    return GetClassName(classId);
  }

  static GetGender(genderId: 0 | 1): string {
    switch (genderId) {
      case 0:
        return "Male";
      case 1:
        return "Female";
    }
  }

  static IsAlliance(race: WoWRaces): boolean {
    switch (race) {
      case WoWRaces.RACE_HUMAN:
      case WoWRaces.RACE_DWARF:
      case WoWRaces.RACE_GNOME:
      case WoWRaces.RACE_NIGHT_ELF:
      case WoWRaces.RACE_DRAENEI:
        return true;
    }

    return false;
  }

  static IsHorde(race: WoWRaces): boolean {
    switch (race) {
      case WoWRaces.RACE_BLOOD_ELF:
      case WoWRaces.RACE_GOBLIN:
      case WoWRaces.RACE_ORC:
      case WoWRaces.RACE_TAUREN:
      case WoWRaces.RACE_TROLL:
      case WoWRaces.RACE_UNDEAD:
        return true;
    }

    return false;
  }
}
