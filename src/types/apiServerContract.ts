/* eslint-disable */
export interface VoteSiteViewObject {
    id: number;
    image: string;
    link: string;
    name: string;
    unsetTime: number;
    value: number;
}
export interface VoteTimerViewObject {
    site: number;
    unsetTimer: number;
}
export interface VoteViewObject {
    site: VoteSiteViewObject;
    unsetTimer: number;
    vp: number;
}
export interface VoteSitesViewModel {
    voteSites: VoteSiteViewObject[];
}
export interface VoteTimersViewModel {
    timers: VoteTimerViewObject[];
}
export interface VoteViewModel {
    vote: VoteViewObject;
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
    settingsType: UserSettingsType;
}
export interface UserViewObject {
    accountId: number;
    currentLogin: UserLogin;
    email: string;
    emailHidden: boolean;
    firstname: string;
    hasAcceptedDonationTerms: boolean;
    id: string;
    joinDate: Date;
    lastLogin: UserLogin;
    lastname: string;
    location: string;
    lockoutEnabled: boolean;
    lockoutEnd: Date | undefined;
    permissions: UserPermission[];
    realms: UserRealm[];
    roles: string[];
    settings: UserSettingsViewObject[];
    totalVotes: number;
    userName: string;
}
export interface UserLogin {
    date: Date;
    ip: string;
    userId: string;
}
export interface UserPermission {
    permission: Permission;
    permissionId: string;
    realmId: number;
    userId: string;
    withGrant: boolean;
}
export interface UserSetting {
    entityType: EntityType;
    entityValue: string;
    settingsType: UserSettingsType;
    userId: string;
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
export interface UserRealm {
    realmId: number;
    userId: string;
}
export interface WoWMap {
    id: number;
    name: string;
}
export interface WoWZone {
    id: number;
    name: string;
}
export interface LoginHistoryViewModel {
    history: UserLogin[];
}
export interface UserDetailsViewModel {
    account: AccountViewObject;
    lastLogin: UserLogin;
    user: UserViewObject;
}
export interface UserLoginViewModel {
    account: AccountViewObject;
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
}
export interface UserViewModel {
    account: AccountViewObject;
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
    accountData: GameAccountData;
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
    accountId: number;
    dp: number;
    extraMask: number;
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
    patchLocation: string;
    population: number;
    port: number;
    realmLocation: string;
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
export interface UserResetPasswordRequest {
    newPassword: string;
    newPasswordAgain: string;
    token: string;
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
    settings: UserSetting[];
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
export interface ArenaTeamMemberViewModel {
    arenaTeamMembers: ArenaTeamMemberViewObject[];
}
export interface ArenaTeamStatisticsViewModel {
    teams: ArenaTeamStatisticViewObject[];
}
export interface CharacterStatisticViewModel {
    characterStatistics: CharacterStatisticViewObject[];
}
export interface GameMastersViewModel {
    admins: AccountViewObject[];
    gameMasters: AccountViewObject[];
    trials: AccountViewObject[];
}
export interface TopBattleRoyaleViewModel {
    statistics: TopBattleRoyaleViewObject[];
}
export interface TopHKViewModel {
    topHKStatistics: TopHKViewObject[];
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
export interface ArenaTeamMemberViewObject {
    accountId: number;
    arenaTeamId: number;
    class: WoWClass;
    games: number;
    gender: WoWGender;
    guid: number;
    level: number;
    name: string;
    race: WoWRace;
    rating: number;
    wins: number;
    zone: number;
}
export interface ArenaTeamStatisticViewObject {
    arenaTeamId: number;
    captain: number;
    members: ArenaTeamMemberViewObject[];
    name: string;
    rank: number;
    rating: number;
    type: ArenaTeamType;
}
export interface CharacterStatisticViewObject {
    classDistributions: number[];
    raceDistributions: number[];
    realmId: number;
    totalCharacters: number;
}
export interface SelectArenaTeamMembersRequest extends RealmSpecificRequest {
    teams: number[];
}
export interface SelectTopArenaTeamsRequest extends RealmSpecificRequest {
    limit: number;
}
export interface TopBattleRoyalePlayerStatistics {
    accountId: number;
    class: WoWClass;
    gender: WoWGender;
    guid: number;
    level: number;
    name: string;
    race: WoWRace;
    rank: number;
    total: number;
    winPercentage: number;
    wins: number;
}
export interface TopBattleRoyaleViewObject {
    realmId: number;
    statistics: TopBattleRoyalePlayerStatistics[];
}
export interface TopHKPlayerStatistic {
    accountId: number;
    class: WoWClass;
    gender: WoWGender;
    guid: number;
    kills: number;
    level: number;
    name: string;
    race: WoWRace;
    rank: number;
}
export interface TopHKRequest {
    limit: number;
    realmIds: number[];
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
    class: WoWClass;
    faction: WoWFaction;
    gender: WoWGender;
    health: number;
    id: number;
    level: number;
    name: string;
    online: boolean;
    power: number;
    powerType: PowerType;
    race: WoWRace;
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
export interface DonationPriceViewModel {
    prices: DonationPriceViewObject[];
}
export interface DonationPriceViewObject {
    amount: number;
    id: number;
    price: number;
}
export interface PayPalDonateRequest {
    id: string;
}
export interface PayPalDonateViewModel {
    redirectUrl: string;
    success: boolean;
}
export interface PayPalLogViewModel {
    currency: string;
    date: Date;
    item: string;
    payerCity: string;
    payerEmail: string;
    payerFirstName: string;
    payerId: string;
    payerLastName: string;
    payerPostalCode: string;
    paymentId: string;
    price: number;
    quantity: number;
    total: number;
    totalDp: number;
    userId: string;
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
    hash: string;
    keepUpdated: boolean;
    modified: Date;
    patch: string;
    size: string;
    realmId: number;
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
export interface Notification_IssueAssignedViewObject extends NotificationViewObject {
    issueId: number;
    issueTitle: string;
}
export interface Notification_IssueClosedViewObject extends NotificationViewObject {
    issueId: number;
    issueStatus: BugTrackerStatus;
    issueTitle: string;
}
export interface Notification_IssueCommentedViewObject extends NotificationViewObject {
    comment: string;
    issueId: number;
    issueTitle: string;
}
export interface Notification_IssueConfirmedViewObject extends NotificationViewObject {
    issueId: number;
    issueTitle: string;
}
export interface Notification_IssueCreatedViewObject extends NotificationViewObject {
    issueId: number;
    issueTitle: string;
}
export interface Notification_IssueFixedViewObject extends NotificationViewObject {
    issueId: number;
    issueTitle: string;
}
export interface Notification_IssueUpdatedViewObject extends NotificationViewObject {
    issueId: number;
    issueTitle: string;
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
export interface GuildBankEventLogViewObject {
    character: CharacterViewObject;
    destTabId: number;
    eventType: GuildBankEventLogTypes;
    guildId: number;
    item: CharacterInventoryViewObject;
    itemOrMoney: number;
    itemStackCount: number;
    logGuid: number;
    playerGuid: number;
    tabId: number;
    timeStamp: string;
}
export interface GuildBankTabViewObject {
    guildÍd: number;
    itemLogs: GuildBankEventLogViewObject[];
    items: CharacterInventoryViewObject[];
    moneyLogs: GuildBankEventLogViewObject[];
    tabIcon: string;
    tabId: number;
    tabName: string;
    tabText: string;
}
export interface GuildEventLogViewObject {
    eventType: GuildEventLogTypes;
    guildId: number;
    logGuid: number;
    newRank: number;
    player1: CharacterViewObject;
    player2: CharacterViewObject;
    timeStamp: string;
}
export interface GuildMemberViewObject {
    character: CharacterViewObject;
    guildId: number;
    offNote: string;
    pnote: string;
    rank: GuildRankViewObject;
    rankId: number;
}
export interface GuildRankViewObject {
    bankMoneyPerDay: number;
    guildId: number;
    id: number;
    rankName: string;
    rights: number;
}
export interface GuildViewObject {
    backgroundColor: number;
    bankMoney: number;
    borderColor: number;
    borderStyle: number;
    createDate: string;
    emblemColor: number;
    emblemStyle: number;
    exp: number;
    id: number;
    info: string;
    leader: GuildMemberViewObject;
    leaderGuid: number;
    level: number;
    members: GuildMemberViewObject[];
    motd: string;
    name: string;
    ranks: GuildRankViewObject[];
}
export interface CharacterInventoryViewObject {
    bagGuid: number;
    count: number;
    entry: number;
    guid: number;
    isBag: boolean;
    item: ItemTemplateViewObject;
    items: CharacterInventoryViewObject[];
    slot: EquipmentSlots;
}
export interface CharacterViewObject extends Player {
}
export interface ItemTemplateViewObject {
    allowableClass: number;
    allowableRace: number;
    armor: number;
    block: number;
    bonding: string;
    buyCount: number;
    buyPrice: number;
    containerSlots: number;
    damageInfos: DamageInfo[];
    delay: string;
    description: string;
    displayId: number;
    dps: string;
    entry: number;
    flags: number;
    flagsExtra: number;
    icon: string;
    inventoryType: string;
    isBag: boolean;
    isHeroic: boolean;
    isUnique: boolean;
    itemLevel: number;
    itemType: string;
    maxCount: number;
    name: string;
    primaryStats: string[];
    quality: ItemQualities;
    qualityColor: string;
    requiredLevel: number;
    secondaryStats: string[];
    sellPrice: number;
}
export interface DamageInfo {
    damageMax: number;
    damageMin: number;
    damageType: string;
}
export interface GuildBankTabsViewModel {
    tabs: GuildBankTabViewObject[];
}
export interface GuildEventLogViewModel {
    logs: GuildEventLogViewObject[];
}
export interface GuildMemberStatusViewModel {
    isGuildLeader: boolean;
    member: GuildMemberViewObject;
}
export interface GuildsViewModel {
    guilds: GuildViewObject[];
}
export interface GuildViewModel {
    guild: GuildViewObject;
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
export interface ChatMessageReactionViewObject extends AuthorModel {
    active: boolean;
    type: ReactionType;
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
export interface CharacterDetailsViewModel {
    account: AccountViewObject;
    character: CharacterViewObject;
    guild: GuildViewObject;
    user: UserViewObject;
}
export interface CharacterInventoryViewModel {
    bagItems: CharacterInventoryViewObject[];
    currencyItems: CharacterInventoryViewObject[];
    inventory: CharacterInventoryViewObject[];
}
export interface CharacterStatsViewModel {
    agility: number;
    armor: number;
    armorPenetration: number;
    attackPower: number;
    blockPct: number;
    critPct: number;
    defense: number;
    dodgePct: number;
    energy: number;
    expertise: number;
    focus: number;
    guid: number;
    happiness: number;
    intellect: number;
    mana: number;
    manaRegen: number;
    maxHealth: number;
    meleeHaste: number;
    meleeHit: number;
    parryPct: number;
    rage: number;
    rangedAttackPower: number;
    rangedCritPct: number;
    rangedHaste: number;
    rangedHit: number;
    resArcane: number;
    resFire: number;
    resFrost: number;
    resHoly: number;
    resilience: number;
    resNature: number;
    resShadow: number;
    runes: number;
    runicPower: number;
    spellCritPct: number;
    spellHaste: number;
    spellHit: number;
    spellPenetration: number;
    spellPower: number;
    spirit: number;
    stamina: number;
    strength: number;
}
export interface CharactersViewModel {
    characters: CharacterViewObject[];
}
export interface BanCharacterRequest extends RealmSpecificRequest {
    guid: number;
    reason: string;
    unbanDate: number;
}
export interface CharacterDetailsViewObject {
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
export interface BugTrackerCategoryViewObject {
    id: number;
    name: string;
}
export interface BugTrackerIssueCommentReactionViewObject extends ReactionViewObject {
    commentId: number;
    issueId: number;
}
export interface BugTrackerIssueCommentViewObject extends AuthorModel {
    comment: string;
    date: Date;
    id: number;
    issueId: number;
    lastEdited: Date | undefined;
    reactions: BugTrackerIssueCommentReactionViewObject[];
}
export interface BugTrackerIssueDetailsViewObject extends BugTrackerIssueViewObject {
    createdByUser: UserViewObject;
}
export interface BugTrackerIssueViewObject {
    assignee: string | undefined;
    categoryId: number;
    comments: BugTrackerIssueCommentViewObject[];
    created: Date;
    createdBy: string;
    description: string;
    id: number;
    priority: BugTrackerPriority;
    reactions: BugTrackerReactionViewObject[];
    realmId: number;
    status: BugTrackerStatus;
    title: string;
    updated: number;
}
export interface BugTrackerReactionViewObject extends ReactionViewObject {
    issueId: number;
}
export interface BugTrackerCategoriesViewModel {
    categories: BugTrackerCategoryViewObject[];
}
export interface BugTrackerCategoryViewModel {
    category: BugTrackerCategoryViewObject;
}
export interface BugTrackerIssueDetailsViewModel {
    assignee: UserViewObject;
    issue: BugTrackerIssueDetailsViewObject;
}
export interface BugTrackerIssueSummaryViewModel {
    confirmedIssues: number;
    fixedIssues: number;
    submittedIssues: number;
    totalIssues: number;
}
export interface BugTrackerIssuesViewModel {
    issues: BugTrackerIssueViewObject[];
}
export interface BugTrackerIssueViewModel {
    issue: BugTrackerIssueViewObject;
}
export interface BugTrackerIssueAddCommentRequest {
    comment: string;
    issueId: number;
}
export interface BugTrackerIssueReactionRequest {
    active: boolean;
    issueId: number;
    type: ReactionType;
}
export interface BugTrackerIssueRemoveCommentRequest {
    commentId: number;
    issueId: number;
}
export interface BugTrackerIssueUpdateCommentRequest {
    comment: string;
    commentId: number;
    issueId: number;
}
export interface CreateBugTrackerCategoryRequest {
    name: string;
}
export interface CreateBugTrackerIssueRequest {
    categoryId: number;
    description: string;
    priority: BugTrackerPriority;
    realmId: number;
    title: string;
}
export interface UpdateBugTrackerIssueRequest extends CreateBugTrackerIssueRequest {
    assignee: string | undefined;
    issueId: number;
    status: BugTrackerStatus;
    triggerSummariesBroadcast: boolean;
}
export interface ItemDisplayInfoViewObject {
    icon: string;
    id: number;
}
export interface ItemDisplayInfoViewModel {
    displayInfo: ItemDisplayInfoViewObject[];
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
    newPassword: string;
}
export interface UpdateUsernameRequest {
    currentUsername: string;
    newUsername: string;
    password: string;
}
export enum UserSettingsType {
    HideEmail = 1,
    HidePhoneNumber = 2,
    HideFirstname = 3,
    HideLastname = 4
}
export enum ArenaTeamType {
    ArenaTeamType1v1 = 1,
    ArenaTeamType2v2 = 2,
    ArenaTeamType3v3 = 3,
    ArenaTeamType5v5 = 5
}
export enum BugTrackerPriority {
    None = 0,
    Low = 1,
    Medium = 2,
    High = 3
}
export enum BugTrackerStatus {
    Pending = 0,
    Invalid = 1,
    Confirmed = 2,
    Duplicate = 3,
    InProgress = 4,
    WontFix = 5,
    Fixed = 6,
    CantReproduce = 7
}
export enum EntityType {
    Integer = 1,
    Decimal = 2,
    Double = 3,
    String = 4,
    Boolean = 5
}
export enum EquipmentSlots {
    EQUIPMENT_SLOT_START = 0,
    EQUIPMENT_SLOT_HEAD = 0,
    EQUIPMENT_SLOT_NECK = 1,
    EQUIPMENT_SLOT_SHOULDERS = 2,
    EQUIPMENT_SLOT_BODY = 3,
    EQUIPMENT_SLOT_CHEST = 4,
    EQUIPMENT_SLOT_WAIST = 5,
    EQUIPMENT_SLOT_LEGS = 6,
    EQUIPMENT_SLOT_FEET = 7,
    EQUIPMENT_SLOT_WRISTS = 8,
    EQUIPMENT_SLOT_HANDS = 9,
    EQUIPMENT_SLOT_FINGER1 = 10,
    EQUIPMENT_SLOT_FINGER2 = 11,
    EQUIPMENT_SLOT_TRINKET1 = 12,
    EQUIPMENT_SLOT_TRINKET2 = 13,
    EQUIPMENT_SLOT_BACK = 14,
    EQUIPMENT_SLOT_MAINHAND = 15,
    EQUIPMENT_SLOT_OFFHAND = 16,
    EQUIPMENT_SLOT_RANGED = 17,
    EQUIPMENT_SLOT_TABARD = 18,
    EQUIPMENT_SLOT_END = 19
}
export enum GameRole {
    Player = 0,
    Trial = 1,
    GameMaster = 2,
    Admin = 3
}
export enum GuildBankEventLogTypes {
    GUILD_BANK_LOG_DEPOSIT_ITEM = 1,
    GUILD_BANK_LOG_WITHDRAW_ITEM = 2,
    GUILD_BANK_LOG_MOVE_ITEM = 3,
    GUILD_BANK_LOG_DEPOSIT_MONEY = 4,
    GUILD_BANK_LOG_WITHDRAW_MONEY = 5,
    GUILD_BANK_LOG_REPAIR_MONEY = 6,
    GUILD_BANK_LOG_MOVE_ITEM2 = 7,
    GUILD_BANK_LOG_UNK1 = 8,
    GUILD_BANK_LOG_BUY_SLOT = 9
}
export enum GuildEventLogTypes {
    GUILD_EVENT_LOG_INVITE_PLAYER = 1,
    GUILD_EVENT_LOG_JOIN_GUILD = 2,
    GUILD_EVENT_LOG_PROMOTE_PLAYER = 3,
    GUILD_EVENT_LOG_DEMOTE_PLAYER = 4,
    GUILD_EVENT_LOG_UNINVITE_PLAYER = 5,
    GUILD_EVENT_LOG_LEAVE_GUILD = 6
}
export enum PowerType {
    MANA = 0,
    RAGE = 1,
    ENERGY = 2,
    RUNIC = 3
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
export enum WoWFaction {
    Alliance = 0,
    Horde = 1
}
export enum WoWGender {
    MALE = 0,
    FEMALE = 1
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
    PrivateMessageReaction = 6,
    IssueCreated = 7,
    IssueUpdated = 8,
    IssueFixed = 9,
    IssueCommented = 10,
    IssueAssigned = 11,
    IssueClosed = 12,
    IssueConfirmed = 13
}
export enum ItemQualities {
    ITEM_QUALITY_POOR = 0,
    ITEM_QUALITY_NORMAL = 1,
    ITEM_QUALITY_UNCOMMON = 2,
    ITEM_QUALITY_RARE = 3,
    ITEM_QUALITY_EPIC = 4,
    ITEM_QUALITY_LEGENDARY = 5,
    ITEM_QUALITY_ARTIFACT = 6,
    ITEM_QUALITY_HEIRLOOM = 7,
    MAX_ITEM_QUALITY = 8
}
export enum BlockType {
    HeroBanner = 1,
    Text = 2,
    HalfWidthBlock = 3,
    CharacterStatistics = 4
}

