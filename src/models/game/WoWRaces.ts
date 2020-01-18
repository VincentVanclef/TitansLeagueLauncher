export enum WoWRaces {
  RACE_HUMAN = 1,
  RACE_ORC = 2,
  RACE_DWARF = 3,
  RACE_NIGHT_ELF = 4,
  RACE_UNDEAD = 5,
  RACE_TAUREN = 6,
  RACE_GNOME = 7,
  RACE_TROLL = 8,
  RACE_GOBLIN = 9,
  RACE_BLOOD_ELF = 10,
  RACE_DRAENEI = 11,
  get
}

export const WoWRacesMap = new Map([
  [WoWRaces.RACE_HUMAN, { name: "HUMAN", color: "#C79C6E" }],
  [WoWRaces.RACE_ORC, { name: "ORC", color: "#F58CBA" }],
  [WoWRaces.RACE_DWARF, { name: "DWARF", color: "#ABD473" }],
  [WoWRaces.RACE_NIGHT_ELF, { name: "NIGHT ELF", color: "#F8C621" }],
  [WoWRaces.RACE_UNDEAD, { name: "UNDEAD", color: "#A330C9" }],
  [WoWRaces.RACE_TAUREN, { name: "TAUREN", color: "#C41F3B" }],
  [WoWRaces.RACE_GNOME, { name: "GNOME", color: "#0070DE" }],
  [WoWRaces.RACE_TROLL, { name: "TROLL", color: "#40C7EB" }],
  [WoWRaces.RACE_GOBLIN, { name: "GOBLIN", color: "#8787ED" }],
  [WoWRaces.RACE_BLOOD_ELF, { name: "BLOOD ELF", color: "#FF7D0A" }],
  [WoWRaces.RACE_DRAENEI, { name: "DRAENEI", color: "#FF7D0A" }]
]);

export const GetRaceColor = (raceId: WoWRaces) => {
  const race = WoWRacesMap.get(raceId);
  return race ? race.color : "";
};

export const GetRaceName = (raceId: WoWRaces) => {
  const race = WoWRacesMap.get(raceId);
  return race ? race.name : "";
};
