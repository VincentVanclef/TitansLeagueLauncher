/* eslint-disable */
export interface VoteTimerViewObject {
    site: number;
    unsetTimer: number;
}
export interface VoteViewObject {
    unsetTimer: number;
    vp: number;
}
export interface VoteSitesViewModel {
    voteSites: VoteSite[];
}
export interface VoteTimersViewModel {
    timers: VoteTimerViewObject[];
}
export interface VoteViewModel {
    vote: VoteViewObject;
}
export interface VoteSite {
    id: number;
    image: string;
    link: string;
    name: string;
    unsetTime: number;
    value: number;
}
export interface WoWMap {
    id: number;
    name: string;
}
export interface WoWZone {
    id: number;
    name: string;
}
export interface SettingsViewObject<T> extends UserSettingsViewObject {
    entityValue: T;
}
export interface UsernameViewObject {
    accountId: number;
    userId: string;
    username: string;
}
export interface UserSettingsViewObject {
    entityType: EntityType;
    settingsType: ApplicationUserSettingsType;
}
export interface UserViewObject {
    accessFailedCount: number;
    accountId: number;
    currentLogin: ApplicationUserLogin;
    email: string;
    emailConfirmed: boolean;
    emailHidden: boolean;
    firstname: string;
    id: string;
    joinDate: Date;
    lastLogin: ApplicationUserLogin;
    lastname: string;
    location: string;
    lockoutEnabled: boolean;
    lockoutEnd: Date | undefined;
    permissions: UserPermission[];
    phoneNumber: string;
    phoneNumberConfirmed: boolean;
    phoneNumberHidden: boolean;
    roles: string[];
    settings: UserSettingsViewObject[];
    totalVotes: number;
    twoFactorEnabled: boolean;
    userName: string;
}
export interface ApplicationUserLogin {
    date: Date;
    ip: string;
    userId: string;
}
export interface ApplicationUserSetting {
    applicationUserId: string;
    entityType: EntityType;
    entityValue: string;
    settingsType: ApplicationUserSettingsType;
}
export interface UserPermission {
    permission: Permission;
    permissionId: string;
    realmId: number;
    userId: string;
    withGrant: boolean;
}
export interface Permission {
    category: PermissionCategory;
    categoryId: number;
    description: string;
    id: string;
    name: string;
}
export interface PermissionCategory {
    id: number;
    name: string;
}
export interface LoginHistoryViewModel {
    history: ApplicationUserLogin[];
}
export interface UserDetailsViewModel {
    account: AccountViewObject;
    lastLogin: ApplicationUserLogin;
    permissions: UserPermission[];
    realms: number[];
    roles: string[];
    user: UserViewObject;
}
export interface UserLoginViewModel {
    account: AccountViewObject;
    accountData: GameAccountData;
    token: string;
    user: UserViewObject;
}
export interface UsernameViewModel {
    data: UsernameViewObject[];
}
export interface UsersViewModel {
    count: number;
    users: UserViewObject[];
}
export interface UserTokenRefreshViewModel {
    token: string;
    user: UserViewObject;
}
export interface UserViewModel {
    user: UserViewObject;
}
export interface AccountAccessViewObject {
    accountId: number;
    gmLevel: GameRole;
    realmId: number;
}
export interface AccountBannedViewObject {
    accountId: number;
    active: number;
    banDate: number;
    bannedBy: string;
    banReason: string;
    unbanDate: number;
}
export interface AccountMutedViewObject {
    accountId: number;
    muteDate: number;
    mutedBy: string;
    muteReason: string;
    muteTime: number;
}
export interface AccountViewObject {
    accountAccess: AccountAccessViewObject[];
    accountBanned: AccountBannedViewObject[];
    accountMuted: AccountMutedViewObject[];
    failedLogins: number;
    id: number;
    joinDate: Date;
    lastAttemptIp: string;
    lastIp: string;
    lastLogin: Date;
    locked: number;
    muteBy: string;
    muteReason: string;
    muteTime: number;
    online: boolean;
    username: string;
}
export interface GameAccountData {
    dp: number;
    extraMask: number;
    id: number;
    vp: number;
}
export interface Realmlist {
    address: string;
    allowedSecurityLevel: GameRole;
    charDb: string;
    flag: number;
    gamebuild: number;
    icon: RealmIcon;
    id: number;
    localAddress: string;
    localSubnetMask: string;
    name: string;
    population: number;
    port: number;
    timezone: RealmTimeZone;
    worldDb: string;
}
export interface FindUserRequest {
    query: string;
}
export interface RefreshTokenRequest {
    expiredToken: string;
}
export interface UpdateIngameAccountPasswordRequest {
    password: string;
    userId: number;
}
export interface UpdateIngameAccountRequest {
    email: string;
    password: string;
    userId: number;
    username: string;
}
export interface UpdateUserPasswordRequest {
    password: string;
    userId: string;
}
export interface UpdateUserRequest {
    email: string;
    firstname: string;
    lastname: string;
    location: string;
    userId: string;
    username: string;
}
export interface UserChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
    newPasswordAgain: string;
}
export interface UserDetailsRequest {
    userId: string;
}
export interface UserLoginRequest {
    email: string;
    password: string;
}
export interface UsernamesRequest {
    accountIds: number[];
    userIds: string[];
}
export interface UserQuickSearchRequest extends RealmSpecificRequest {
    type: number;
}
export interface UserRegisterRequest {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    passwordConfirm: string;
    username: string;
}
export interface UserUpdatePermissionsRequest {
    active: boolean;
    permission: UserPermission;
}
export interface UserUpdateRolesRequest {
    roles: string[];
    userId: string;
}
export interface UserUpdateSettingsRequest {
    settings: ApplicationUserSetting[];
}
export interface UserUpdateUserRealmsRequest {
    realms: number[];
    userId: string;
}
export interface AddRealmRequest {
    charDb: string;
    host: string;
    icon: RealmIcon;
    name: string;
    security: GameRole;
    timeZone: RealmTimeZone;
    worldDb: string;
}
export interface DeleteRealmRequest {
    id: number;
}
export interface EditRealmRequest {
    address: string;
    allowedSecurityLevel: GameRole;
    charDb: string;
    icon: RealmIcon;
    id: number;
    name: string;
    port: number;
    timeZone: RealmTimeZone;
    worldDb: string;
}
export interface MultiRealmSpecificRequest {
    realmIds: number[];
}
export interface RealmSpecificRequest {
    realmId: number;
}
export interface RestartRealmRequest {
    delay: number;
    message: string;
}
export interface UpdateRealmAllowedSecurityLevelRequest extends RealmSpecificRequest {
    security: GameRole;
}
export interface UpdateRealmNameRequest extends RealmSpecificRequest {
    name: string;
}
export interface ToastsViewModel {
    toasts: Toast[];
}
export interface ToastViewModel {
    toast: Toast;
}
export interface Toast {
    action: WebsiteAction;
    clickUrl: string;
    duration: number;
    from: Date;
    id: string;
    subtitle: string;
    title: string;
    to: Date;
}
export interface SystemMetricsHistoryViewModel {
    history: SystemMetricHistoryGraph;
}
export interface SystemMetricsViewModel {
    metrics: SystemMetrics;
}
export interface CpuMetrics {
    load: number[];
    name: string;
}
export interface MetricData {
    freeGb: number;
    freeKb: number;
    freeMb: number;
    freePct: number;
    totalGb: number;
    totalKb: number;
    totalMb: number;
    usedGb: number;
    usedKb: number;
    usedMb: number;
    usedPct: number;
}
export interface MultiValueGraph {
    entries: MultiValueGraphEntry[];
    title: string;
    titles: string[];
}
export interface MultiValueGraphEntry {
    data: number[];
    name: string;
}
export interface SystemMetricHistoryGraph {
    cpu: MultiValueGraph;
    disks: MultiValueGraph;
    memory: MultiValueGraphEntry;
}
export interface SystemMetrics {
    cpu: CpuMetrics;
    created: Date;
    disks: { [key: string]: MetricData };
    memory: MetricData;
}
export interface KeyValuePair<TKey, TValue> {
    key: TKey;
    value: TValue;
}
export interface ArenaTeamStatisticsViewModel {
    teams: ArenaTeamStatisticViewObject[];
}
export interface GameMastersViewModel {
    admins: AccountViewObject[];
    gameMasters: AccountViewObject[];
    trials: AccountViewObject[];
}
export interface TopVotersViewModel {
    topVoter: VoteStatisticViewModel;
    topVoters: VoteStatisticViewModel[];
}
export interface UserStatisticsViewModel {
    newestUser: UserInformationResponse;
    newUsersMonth: number;
    newUsersToday: number;
    newUsersWeek: number;
    totalUsers: number;
}
export interface VoteStatisticViewModel {
    email: string;
    id: string;
    total: number;
    username: string;
}
export interface ArenaTeamMemberViewModel {
    arenaTeamMembers: ArenaTeamMemberViewObject[];
}
export interface ArenaTeamMemberViewObject {
    arenaTeamId: number;
    class: number;
    games: number;
    guid: number;
    level: number;
    name: string;
    rating: number;
    wins: number;
}
export interface ArenaTeamStatisticViewObject {
    arenaTeamId: number;
    captain: number;
    name: string;
    rank: number;
    rating: number;
    type: ArenaTeamType;
}
export interface CharacterStatisticViewModel {
    characterStatistics: CharacterStatisticViewObject[];
}
export interface CharacterStatisticViewObject {
    classDistributions: number[];
    raceDistributions: number[];
    realmId: number;
    totalCharacters: number;
}
export interface SelectTopArenaTeamsRequest extends RealmSpecificRequest {
    limit: number;
}
export interface TopHKPlayerStatistic {
    accountId: number;
    class: number;
    gender: number;
    guid: number;
    kills: number;
    level: number;
    name: string;
    race: number;
    rank: number;
}
export interface TopHKRequest {
    limit: number;
    realmIds: number[];
}
export interface TopHKViewModel {
    topHKStatistics: TopHKViewObject[];
}
export interface TopHKViewObject {
    realmId: number;
    statistics: TopHKPlayerStatistic[];
}
export interface GenericViewModel<T> {
    data: T;
    message: string;
}
export interface KickUserRequest {
    connectionId: string;
}
export interface UserInformationResponse {
    email: string;
    id: string;
    username: string;
}
export interface SliderViewModel {
    slides: SliderImage[];
}
export interface SlideViewModel {
    slide: SliderImage;
}
export interface SliderImage {
    action: WebsiteAction;
    clickUrl: string;
    id: string;
    imageUrl: string;
    srcSet: string;
    text: SliderImageText;
    title: string;
}
export interface SliderImageText {
    html: string;
}
export interface ShoutBoxMessagesRequest {
    count: number;
}
export interface ShoutByIdRequest {
    id: string;
}
export interface ShoutRequest {
    message: string;
}
export interface RealmlistsViewModel {
    realmList: Realmlist[];
}
export interface RealmlistViewModel {
    realmList: Realmlist;
}
export interface RealmsViewModel {
    realms: Realm[];
}
export interface UpdateRealmsViewModel {
    realm: Realm;
    realmlist: Realmlist;
}
export interface Realm {
    allowedSecurityLevel: GameRole;
    id: number;
    name: string;
    online: boolean;
    onlinePlayers: Player[];
    timezone: RealmTimeZone;
}
export interface Player {
    accountId: number;
    class: number;
    gender: number;
    level: number;
    name: string;
    race: number;
    rank: GameRole;
    realmId: number;
    zone: number;
}
export interface ReactionViewObject extends AuthorModel {
    active: boolean;
    type: ReactionType;
}
export interface AuthorModel {
    author: string;
    authorEmail: string;
    authorName: string;
    emailHidden: boolean;
}
export interface PayPalDonateRequest {
    id: string;
}
export interface PayPalSuccessRequest {
    accountId: number;
    payerId: string;
    paymentId: string;
    token: string;
    userId: string;
}
export interface PatchViewObject {
    details: string;
    downloadLink: string;
    keepUpdated: boolean;
    modified: Date;
    patch: string;
}
export interface PatchViewModel {
    patches: PatchViewObject[];
}
export interface NotificationViewObject extends AuthorModel {
    created: Date;
    id: string;
    message: string;
    seen: boolean;
    type: NotificationType;
    userId: string;
}
export interface Notification_NewsCommentReactionViewObject extends NotificationViewObject {
    comment: string;
    commentId: number;
    newsId: number;
    reactionType: ReactionType;
}
export interface Notification_NewsCommentViewObject extends NotificationViewObject {
    comment: string;
    commentId: number;
    newsId: number;
    newsTitle: string;
}
export interface Notification_NewsCreatedViewObject extends NotificationViewObject {
    newsId: number;
    newsTitle: string;
}
export interface Notification_NewsReactionViewObject extends NotificationViewObject {
    newsId: number;
    newsTitle: string;
    reactionType: ReactionType;
}
export interface Notification_PrivateMessageReactionViewObject extends NotificationViewObject {
    chatId: string;
    chatMessage: string;
    messageId: string;
    reactionType: ReactionType;
}
export interface Notification_PrivateMessageViewObject extends NotificationViewObject {
    chatId: string;
    chatMessage: string;
    messageId: string;
}
export interface NotificationsViewModel {
    notification: NotificationViewObject[];
}
export interface NotificationViewModel {
    notification: NotificationViewObject;
}
export interface NewsCommentAndReactionViewObject {
    commentCount: number;
    newsId: number;
    reactions: NewsReactionViewObject[];
}
export interface NewsCommentReactionViewObject extends ReactionViewObject {
    newsCommentId: number;
    newsId: number;
}
export interface NewsCommentViewObject extends AuthorModel {
    comment: string;
    date: Date;
    id: number;
    lastEdited: Date | undefined;
    newsId: number;
    reactions: NewsCommentReactionViewObject[];
}
export interface NewsReactionViewObject extends ReactionViewObject {
    newsId: number;
}
export interface NewsViewObject extends AuthorModel {
    commentCount: number;
    comments: NewsCommentViewObject[];
    content: string;
    date: Date;
    id: number;
    reactions: NewsReactionViewObject[];
    title: string;
}
export interface NewsCommentAndReactionViewModel {
    data: NewsCommentAndReactionViewObject;
}
export interface NewsCommentReactionViewModel {
    reaction: NewsCommentReactionViewObject;
    reactions: NewsCommentReactionViewObject[];
}
export interface NewsCommentViewModel {
    comments: NewsCommentViewObject[];
}
export interface NewsReactionViewModel {
    reaction: NewsReactionViewObject;
    reactions: NewsReactionViewObject[];
}
export interface NewsViewModel {
    article: NewsViewObject;
    articles: NewsViewObject[];
}
export interface MultiNewsRequest {
    newsIds: number[];
}
export interface NewsAddCommentRequest extends SpecificNewsRequest {
    comment: string;
}
export interface NewsCommentReactionRequest extends SpecificNewsRequest {
    active: boolean;
    commentId: number;
    type: ReactionType;
}
export interface NewsCreateRequest {
    content: string;
    title: string;
}
export interface NewsDeleteCommentRequest extends SpecificNewsRequest {
    id: number;
}
export interface NewsDeleteRequest extends SpecificNewsRequest {
}
export interface NewsEditCommentRequest extends SpecificNewsRequest {
    comment: string;
    id: number;
}
export interface NewsEditRequest {
    content: string;
    newsId: number;
    title: string;
}
export interface NewsReactionRequest extends SpecificNewsRequest {
    active: boolean;
    type: ReactionType;
}
export interface SpecificNewsRequest {
    newsId: number;
}
export interface WoWMapViewModel {
    maps: WoWMap[];
}
export interface WoWZoneViewModel {
    zones: WoWZone[];
}
export interface MapRequest {
    mapIds: number[];
}
export interface ZoneRequest {
    zoneIds: number[];
}
export interface BaseBlockViewObject {
    aspectRatio: number;
    backgroundColor: string;
    backgroundImage: string;
    borderRadius: number;
    headLine: string;
    id: string;
    link: Link;
    padding: string;
    sort: number;
    type: BlockType;
}
export interface CharacterStatisticsBlockViewObject extends BaseBlockViewObject {
    horizontal: boolean;
    realmId: number;
}
export interface HalfWidthBlockViewObject extends BaseBlockViewObject {
    blocks: BaseBlockViewObject[];
}
export interface HeroBannerViewObject extends BaseBlockViewObject {
    captionAlignment: Alignment;
    captionText: Text;
}
export interface TextBlockViewObject extends BaseBlockViewObject {
    text: Text;
}
export interface Link {
    name: string;
    target: string;
    url: string;
}
export enum Alignment {
    Left = 1,
    Right = 2,
    Center = 3
}
export interface Text {
    backgroundColor: string;
    bold: boolean;
    borderRadius: number;
    color: string;
    content: string;
    padding: string;
    size: number;
}
export interface ContentPageViewModel {
    alias: string;
    blocks: BaseBlockViewObject[];
    created: Date;
    createdBy: string;
    id: string;
    lastModified: Date;
    lastModifiedBy: string;
    url: string;
}
export interface CreateContentPageRequest {
    alias: string;
    url: string;
}
export interface SaveBlocksRequest {
    blocks: any[][];
    url: string;
}
export interface SaveContentPageRequest extends SaveBlocksRequest {
    alias: string;
    id: string;
}
export interface ChatMemberViewObject extends AuthorModel {
    online: boolean;
}
export interface ChatMessageReactionViewObject extends ReactionViewObject {
}
export interface ChatMessageViewObject extends AuthorModel {
    created: Date;
    groupId: string;
    id: string;
    message: string;
    reactions: ChatMessageReactionViewObject[];
    seenBy: string[];
}
export interface ChatSearchViewObject {
    userEmail: string;
    userId: string;
    userName: string;
}
export interface GroupChatViewObject {
    created: Date;
    id: string;
    image: string;
    members: ChatMemberViewObject[];
    modified: Date;
    name: string;
    owner: string;
    unreadMessageCount: number;
}
export interface ChatMessageViewModel {
    messages: ChatMessageViewObject[];
    pageNumber: number;
    total: number;
}
export interface ChatSearchViewModel {
    count: number;
    members: ChatMember[];
}
export interface GroupChatsViewModel {
    groupChats: GroupChatViewObject[];
}
export interface GroupChatViewModel {
    groupChat: GroupChatViewObject;
}
export interface ChatMember extends AuthorModel {
    online: boolean;
}
export interface ChatMessageReactionRequest {
    active: boolean;
    chatId: string;
    messageId: string;
    type: ReactionType;
}
export interface ChatMessageRequest {
    messageId: string;
}
export interface CreateGroupChatRequest {
    members: string[];
}
export interface GroupChatMessageRequest {
    chatId: string;
    message: string;
}
export interface KickGroupChatMemberRequest {
    groupId: string;
    memberId: string;
}
export interface UpdateGroupChatImageRequest {
    groupId: string;
    image: string;
}
export interface UpdateGroupChatNameRequest {
    groupId: string;
    name: string;
}
export interface BanCharacterRequest extends RealmSpecificRequest {
    guid: number;
    reason: string;
    unbanDate: number;
}
export interface SelectCharacterByGuidRequest extends RealmSpecificRequest {
    guid: number;
}
export interface SelectCharacterByNameRequest extends RealmSpecificRequest {
    name: string;
}
export interface TeleportCharacterRequest extends RealmSpecificRequest {
    guid: number;
    location: number;
}
export interface UnBanCharacterRequest extends RealmSpecificRequest {
    guid: number;
}
export interface GetGuildBankEventLogsRequest extends RealmSpecificRequest {
    eventTypes: number[];
    guildId: number;
    tabId: number;
}
export interface GetGuildByIdRequest extends RealmSpecificRequest {
    guildId: number;
}
export interface GetGuildByNameRequest extends RealmSpecificRequest {
    guildName: string;
}
export interface InventoryViewObject {
    item: ItemTemplate;
    itemCount: number;
    itemEntry: number;
    itemGuid: number;
    slot: number;
}
export interface ItemDisplayIdsRequest {
    displayIds: number[];
}
export interface ItemTemplate {
    allowableClass: number;
    allowableRace: number;
    ammoType: number;
    arcaneRes: number;
    area: number;
    armor: number;
    armorDamageModifier: number;
    bagFamily: number;
    block: number;
    bonding: number;
    buyCount: number;
    buyPrice: number;
    class: number;
    cond: number;
    containerSlots: number;
    delay: number;
    description: string;
    disenchantId: number;
    displayId: number;
    dmgMax1: number;
    dmgMax2: number;
    dmgMin1: number;
    dmgMin2: number;
    dmgType1: number;
    dmgType2: number;
    duration: number;
    entry: number;
    fireRes: number;
    flags: number;
    flagsCustom: number;
    flagsExtra: number;
    foodType: number;
    frostRes: number;
    gemProperties: number;
    holidayId: number;
    holyRes: number;
    inventoryType: number;
    itemLevel: number;
    itemLimitCategory: number;
    itemSet: number;
    languageId: number;
    lockId: number;
    map: number;
    material: number;
    maxCount: number;
    maxDurability: number;
    maxMoneyLoot: number;
    minMoneyLoot: number;
    name: string;
    natureRes: number;
    pageMaterial: number;
    pageText: number;
    quality: number;
    randomProperty: number;
    randomSuffix: number;
    rangedModRange: number;
    requiredCityRank: number;
    requiredDisenchantSkill: number;
    requiredHonorRank: number;
    requiredLevel: number;
    requiredReputationFaction: number;
    requiredReputationRank: number;
    requiredSkill: number;
    requiredSkillRank: number;
    requiredSpell: number;
    scalingStatDistribution: number;
    scalingStatValue: number;
    scriptName: string;
    sellPrice: number;
    shadowRes: number;
    sheath: number;
    socketBonus: number;
    socketColor1: number;
    socketColor2: number;
    socketColor3: number;
    socketContent1: number;
    socketContent2: number;
    socketContent3: number;
    soundOverrideSubclass: number;
    spellCategory1: number;
    spellCategory2: number;
    spellCategory3: number;
    spellCategory4: number;
    spellCategory5: number;
    spellCategoryCooldown1: number;
    spellCategoryCooldown2: number;
    spellCategoryCooldown3: number;
    spellCategoryCooldown4: number;
    spellCategoryCooldown5: number;
    spellCharges1: number;
    spellCharges2: number;
    spellCharges3: number;
    spellCharges4: number;
    spellCharges5: number;
    spellCooldown1: number;
    spellCooldown2: number;
    spellCooldown3: number;
    spellCooldown4: number;
    spellCooldown5: number;
    spellId1: number;
    spellId2: number;
    spellId3: number;
    spellId4: number;
    spellId5: number;
    spellPpmRate1: number;
    spellPpmRate2: number;
    spellPpmRate3: number;
    spellPpmRate4: number;
    spellPpmRate5: number;
    spellTrigger1: number;
    spellTrigger2: number;
    spellTrigger3: number;
    spellTrigger4: number;
    spellTrigger5: number;
    stackAble: number | undefined;
    startQuest: number;
    statsCount: number;
    statType1: number;
    statType10: number;
    statType2: number;
    statType3: number;
    statType4: number;
    statType5: number;
    statType6: number;
    statType7: number;
    statType8: number;
    statType9: number;
    statValue1: number;
    statValue10: number;
    statValue2: number;
    statValue3: number;
    statValue4: number;
    statValue5: number;
    statValue6: number;
    statValue7: number;
    statValue8: number;
    statValue9: number;
    subclass: number;
    totemCategory: number;
}
export interface SelectArenaTeamMembersRequest extends RealmSpecificRequest {
    teams: number[];
}
export interface ChangelogCategoryViewObject {
    color: string;
    gameClass: WoWClass;
    gameRace: WoWRace;
    id: string;
    name: string;
    parentId: string;
    sort: number;
}
export interface ChangelogEntryViewObject {
    category: ChangelogCategoryViewObject;
    changelogs: ChangelogViewObject[];
    children: ChangelogEntryViewObject[];
}
export interface ChangelogReleaseViewObject {
    createdBy: string;
    createdDate: Date;
    id: string;
    publishedBy: string;
    publishedDate: Date | undefined;
    realm: number;
}
export interface ChangelogViewObject {
    categoryId: string;
    description: string;
    id: string;
    realm: number;
    releaseId: string;
}
export interface ChangelogCategoriesViewModel {
    categories: ChangelogCategoryViewObject[];
}
export interface ChangelogCategoryViewModel {
    category: ChangelogCategoryViewObject;
}
export interface ChangelogEntriesViewModel {
    changelogEntries: ChangelogEntryViewObject[];
}
export interface ChangelogReleasesViewModel {
    releases: ChangelogReleaseViewObject[];
}
export interface ChangelogReleaseViewModel {
    release: ChangelogReleaseViewObject;
}
export interface ChangelogsViewModel {
    changelogs: ChangelogViewObject[];
}
export interface ChangelogViewModel {
    changelog: ChangelogViewObject;
}
export interface ChangelogsByReleaseIdRequest extends RealmSpecificRequest {
    id: string;
}
export interface CreateChangelogReleaseRequest {
    release: ChangelogRelease;
}
export interface ChangelogRelease {
    createdBy: string;
    createdDate: Date;
    id: string;
    publishedBy: string;
    publishedDate: Date | undefined;
    realm: number;
}
export interface PermissionsViewModel {
    categories: PermissionCategory[];
    permissions: Permission[];
}
export interface RolesViewModel {
    roles: string[];
}
export interface BanAccountRequest {
    accountId: number;
    reason: string;
    unBanDate: number;
}
export interface MuteAccountRequest {
    accountId: number;
    muteMinutes: number;
    reason: string;
}
export interface SelectAccountRequest extends RealmSpecificRequest {
    accountId: number;
}
export interface UpdateAccountAccessRequest extends RealmSpecificRequest {
    accessId: GameRole;
    accountId: number;
}
export interface UpdatePasswordRequest {
    currentPassword: string;
    currentUsername: string;
    newPassword: string;
}
export interface UpdateUsernameRequest {
    currentUsername: string;
    newUsername: string;
    password: string;
}
export enum ApplicationUserSettingsType {
    HideEmail = 1,
    HidePhoneNumber = 2
}
export enum ArenaTeamType {
    ArenaTeamType2v2 = 2,
    ArenaTeamType3v3 = 3,
    ArenaTeamType5v5 = 5
}
export enum EntityType {
    Integer = 1,
    Decimal = 2,
    Double = 3,
    String = 4,
    Boolean = 5
}
export enum GameRole {
    Player = 0,
    Trial = 1,
    GameMaster = 2,
    Admin = 3
}
export enum RealmIcon {
    Normal = 0,
    PvP = 1,
    RP = 6,
    RPPVP = 8
}
export enum RealmTimeZone {
    Development = 1,
    USA = 2,
    Oceanic = 3,
    Tournament = 5,
    English = 8,
    TestServer = 26
}
export enum WebsiteAction {
    Register = 1
}
export enum WoWClass {
    CLASS_NONE = 0,
    CLASS_WARRIOR = 1,
    CLASS_PALADIN = 2,
    CLASS_HUNTER = 3,
    CLASS_ROGUE = 4,
    CLASS_PRIEST = 5,
    CLASS_DEATH_KNIGHT = 6,
    CLASS_SHAMAN = 7,
    CLASS_MAGE = 8,
    CLASS_WARLOCK = 9,
    CLASS_UNK = 10,
    CLASS_DRUID = 11,
    CLASS_MAX = 12
}
export enum WoWRace {
    RACE_NONE = 0,
    RACE_HUMAN = 1,
    RACE_ORC = 2,
    RACE_DWARF = 3,
    RACE_NIGHT_ELF = 4,
    RACE_UNDEAD = 5,
    RACE_TAUREN = 6,
    RACE_GNOME = 7,
    RACE_TROLL = 8,
    RACE_UNK = 9,
    RACE_BLOOD_ELF = 10,
    RACE_DRAENEI = 11,
    RACE_MAX = 12
}
export enum ReactionType {
    Like = 1,
    Heart = 2,
    Amazed = 3,
    Dislike = 4
}
export enum NotificationType {
    PrivateMessage = 1,
    NewsCreated = 2,
    NewsReaction = 3,
    NewsComment = 4,
    NewsCommentReaction = 5,
    PrivateMessageReaction = 6
}
export enum BlockType {
    HeroBanner = 1,
    Text = 2,
    HalfWidthBlock = 3,
    CharacterStatistics = 4
}

