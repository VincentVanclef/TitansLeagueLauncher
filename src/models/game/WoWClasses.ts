export enum WoWClass {
	CLASS_WARRIOR = 1,
	CLASS_PALADIN = 2,
	CLASS_HUNTER = 3,
	CLASS_ROGUE = 4,
	CLASS_PRIEST = 5,
	CLASS_DEATH_KNIGHT = 6,
	CLASS_SHAMAN = 7,
	CLASS_MAGE = 8,
	CLASS_WARLOCK = 9,
	CLASS_DRUID = 11
}

export const WoWClassesMap = new Map([
    [WoWClass.CLASS_WARRIOR, { name: 'WARRIOR', color: '#C79C6E' }],
    [WoWClass.CLASS_PALADIN, { name: 'PALADIN', color: '#F58CBA' }],
    [WoWClass.CLASS_HUNTER, { name: 'HUNTER', color: '#ABD473' }],
    [WoWClass.CLASS_ROGUE, { name: 'ROGUE', color: '#F8C621' }],
    [WoWClass.CLASS_PRIEST, { name: 'PRIEST', color: '#A330C9' }],
    [WoWClass.CLASS_DEATH_KNIGHT, { name: 'DEATH KNIGHT', color: '#C41F3B' }],
    [WoWClass.CLASS_SHAMAN, { name: 'SHAMAN', color: '#0070DE' }],
    [WoWClass.CLASS_MAGE, { name: 'MAGE', color: '#40C7EB' }],
    [WoWClass.CLASS_WARLOCK, { name: 'WARLOCK', color: '#8787ED' }],
    [WoWClass.CLASS_DRUID, { name: 'DRUID', color: '#FF7D0A' }]
]);

export const GetClassColor = (classId: WoWClass) => {
    const _class = WoWClassesMap.get(classId);
    return _class ? _class.color : '';
};

export const GetClassName = (classId: WoWClass) => {
    const _class = WoWClassesMap.get(classId);
    return _class ? _class.name : '';
};
