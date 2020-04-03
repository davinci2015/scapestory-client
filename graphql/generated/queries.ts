export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Upload: any,
};

export type Additive = Equipment & {
   __typename?: 'Additive',
  id: Scalars['Int'],
  predefined: Scalars['Boolean'],
  model: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
  brand?: Maybe<Brand>,
};

export type Aquascape = {
   __typename?: 'Aquascape',
  likesCount: Scalars['Int'],
  likes: Likes,
  id: Scalars['Int'],
  createdAt: Scalars['String'],
  updatedAt: Scalars['String'],
  title?: Maybe<Scalars['String']>,
  featured: Scalars['Boolean'],
  trending: Scalars['Boolean'],
  description?: Maybe<Scalars['String']>,
  userId: Scalars['Int'],
  user?: Maybe<User>,
  co2?: Maybe<Co2>,
  tank?: Maybe<Tank>,
  mainImageUrl?: Maybe<Scalars['String']>,
  mainImagePublicId?: Maybe<Scalars['String']>,
  images: Array<AquascapeImage>,
  tags: Array<Tag>,
  plants: Array<Plant>,
  hardscape: Array<Hardscape>,
  livestock: Array<Livestock>,
  filters: Array<Filter>,
  lights: Array<Light>,
  substrates: Array<Substrate>,
  additives: Array<Additive>,
  comments: Array<Comment>,
  viewsCount: Scalars['Int'],
};


export type AquascapeLikesArgs = {
  limit?: Maybe<Scalars['Int']>
};

export type AquascapeImage = {
   __typename?: 'AquascapeImage',
  id: Scalars['Int'],
  title?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  url: Scalars['String'],
  publicId: Scalars['String'],
  createdAt: Scalars['String'],
  updatedAt: Scalars['String'],
};

export type AquascapesFilter = {
  trending?: Maybe<Scalars['Boolean']>,
};

export type AquascapesResult = {
   __typename?: 'AquascapesResult',
  rows: Array<Aquascape>,
  count: Scalars['Int'],
};

export type AuthPayload = {
   __typename?: 'AuthPayload',
  token: Scalars['String'],
  user: User,
};

export type Brand = {
   __typename?: 'Brand',
  id: Scalars['Int'],
  predefined: Scalars['Boolean'],
  name: Scalars['String'],
  logo?: Maybe<Scalars['String']>,
  address?: Maybe<Scalars['String']>,
};

export type Co2 = {
   __typename?: 'CO2',
  id: Scalars['Int'],
  type?: Maybe<Scalars['String']>,
  bps?: Maybe<Scalars['Int']>,
};

export type Comment = {
   __typename?: 'Comment',
  aquascape?: Maybe<Aquascape>,
  id: Scalars['Int'],
  createdAt: Scalars['String'],
  content: Scalars['String'],
  parentCommentId?: Maybe<Scalars['Int']>,
  likes: Array<Like>,
  user: User,
  aquascapeImageId?: Maybe<Scalars['Int']>,
  aquascapeId?: Maybe<Scalars['Int']>,
  commentId?: Maybe<Scalars['Int']>,
};

export enum CommentEntityType {
  Aquascape = 'AQUASCAPE',
  Image = 'IMAGE'
}

export type Equipment = {
  id: Scalars['Int'],
  predefined: Scalars['Boolean'],
  model: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
  brand?: Maybe<Brand>,
};

export type EquipmentArgs = {
  equipmentType: EquipmentType,
  equipmentId?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
};

export enum EquipmentType {
  Filter = 'FILTER',
  Substrate = 'SUBSTRATE',
  Light = 'LIGHT',
  Additives = 'ADDITIVES'
}

export type Filter = Equipment & {
   __typename?: 'Filter',
  id: Scalars['Int'],
  predefined: Scalars['Boolean'],
  model: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
  brand?: Maybe<Brand>,
};

export type Follow = {
   __typename?: 'Follow',
  id: Scalars['Int'],
  followedUserId: Scalars['Int'],
  followerUserId: Scalars['Int'],
  followed: User,
  follower: User,
  updatedAt: Scalars['String'],
  createdAt: Scalars['String'],
};

export type Followers = {
   __typename?: 'Followers',
  rows: Array<Follow>,
  count: Scalars['Int'],
};

export type Following = {
   __typename?: 'Following',
  rows: Array<Follow>,
  count: Scalars['Int'],
};

export type FollowResult = {
   __typename?: 'FollowResult',
  followers: Followers,
  following: Following,
};

export type Hardscape = {
   __typename?: 'Hardscape',
  id: Scalars['Int'],
  predefined: Scalars['Boolean'],
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
};

export type ImageUploadResult = {
   __typename?: 'ImageUploadResult',
  imageUrl: Scalars['String'],
  imagePublicId: Scalars['String'],
};

export enum ImageVariant {
  Profile = 'PROFILE',
  Cover = 'COVER'
}

export type Light = Equipment & {
   __typename?: 'Light',
  id: Scalars['Int'],
  predefined: Scalars['Boolean'],
  model: Scalars['String'],
  width?: Maybe<Scalars['Float']>,
  height?: Maybe<Scalars['Float']>,
  depth?: Maybe<Scalars['Float']>,
  power?: Maybe<Scalars['Float']>,
  lumenMin?: Maybe<Scalars['Int']>,
  lumenMax?: Maybe<Scalars['Int']>,
  kelvinMin?: Maybe<Scalars['Int']>,
  kelvinMax?: Maybe<Scalars['Int']>,
  dimmable?: Maybe<Scalars['Boolean']>,
  description?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
  brand?: Maybe<Brand>,
};

export type Like = {
   __typename?: 'Like',
  user: User,
  id: Scalars['Int'],
  userId: Scalars['Int'],
  aquascapeImageId?: Maybe<Scalars['Int']>,
  aquascapeId?: Maybe<Scalars['Int']>,
  commentId?: Maybe<Scalars['Int']>,
  aquascape?: Maybe<Aquascape>,
  comment?: Maybe<Comment>,
};

export enum LikeEntityType {
  Aquascape = 'AQUASCAPE',
  Image = 'IMAGE',
  Comment = 'COMMENT'
}

export type Likes = {
   __typename?: 'Likes',
  rows: Array<Like>,
  count: Scalars['Int'],
};

export type Livestock = {
   __typename?: 'Livestock',
  id: Scalars['Int'],
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
};

export type MainImageUploadResult = {
   __typename?: 'MainImageUploadResult',
  mainImagePublicId: Scalars['String'],
  mainImageUrl: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  uploadUserImage: ImageUploadResult,
  updateUserDetails?: Maybe<Array<Maybe<User>>>,
  confirmEmail?: Maybe<AuthPayload>,
  addEquipment: Equipment,
  removeEquipment?: Maybe<Equipment>,
  addLight: Light,
  removeLight?: Maybe<Light>,
  addPlant: Plant,
  removePlant?: Maybe<Plant>,
  addHardscape: Hardscape,
  removeHardscape?: Maybe<Hardscape>,
  addLivestock: Livestock,
  removeLivestock?: Maybe<Livestock>,
  like?: Maybe<Like>,
  dislike?: Maybe<Like>,
  addAquascapeImage: AquascapeImage,
  deleteAquascapeImage?: Maybe<Scalars['Int']>,
  createAquascape: Aquascape,
  updateAquascapeTitle?: Maybe<Scalars['String']>,
  updateAquascapeMainImage: MainImageUploadResult,
  removeAquascape: Scalars['Int'],
  addComment?: Maybe<Comment>,
  removeComment?: Maybe<Comment>,
  readNotifications?: Maybe<Scalars['Int']>,
  followUser?: Maybe<Follow>,
  unfollowUser?: Maybe<Follow>,
  login?: Maybe<AuthPayload>,
  register?: Maybe<User>,
  fbRegister?: Maybe<AuthPayload>,
  googleRegister?: Maybe<AuthPayload>,
  resendConfirmationMail?: Maybe<Scalars['Int']>,
  visitAquascape: VisitAquascapeResult,
};


export type MutationUploadUserImageArgs = {
  file: Scalars['Upload'],
  imageVariant: ImageVariant
};


export type MutationUpdateUserDetailsArgs = {
  details: UserDetails
};


export type MutationConfirmEmailArgs = {
  token: Scalars['String']
};


export type MutationAddEquipmentArgs = {
  equipment: EquipmentArgs,
  aquascapeId: Scalars['Int']
};


export type MutationRemoveEquipmentArgs = {
  equipment: EquipmentArgs,
  aquascapeId: Scalars['Int']
};


export type MutationAddLightArgs = {
  brand: Scalars['String'],
  model: Scalars['String'],
  aquascapeId: Scalars['Int']
};


export type MutationRemoveLightArgs = {
  lightId: Scalars['Int'],
  aquascapeId: Scalars['Int']
};


export type MutationAddPlantArgs = {
  plantId?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  aquascapeId: Scalars['Int']
};


export type MutationRemovePlantArgs = {
  plantId: Scalars['Int'],
  aquascapeId: Scalars['Int']
};


export type MutationAddHardscapeArgs = {
  hardscapeId?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  aquascapeId: Scalars['Int']
};


export type MutationRemoveHardscapeArgs = {
  hardscapeId: Scalars['Int'],
  aquascapeId: Scalars['Int']
};


export type MutationAddLivestockArgs = {
  livestockId?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  aquascapeId: Scalars['Int']
};


export type MutationRemoveLivestockArgs = {
  livestockId: Scalars['Int'],
  aquascapeId: Scalars['Int']
};


export type MutationLikeArgs = {
  aquascapeId: Scalars['Int'],
  entity: LikeEntityType,
  entityId: Scalars['Int']
};


export type MutationDislikeArgs = {
  entity: LikeEntityType,
  entityId: Scalars['Int']
};


export type MutationAddAquascapeImageArgs = {
  aquascapeId: Scalars['Int'],
  file: Scalars['Upload']
};


export type MutationDeleteAquascapeImageArgs = {
  aquascapeId: Scalars['Int'],
  imageId: Scalars['Int']
};


export type MutationUpdateAquascapeTitleArgs = {
  aquascapeId: Scalars['Int'],
  title: Scalars['String']
};


export type MutationUpdateAquascapeMainImageArgs = {
  aquascapeId: Scalars['Int'],
  file: Scalars['Upload']
};


export type MutationRemoveAquascapeArgs = {
  aquascapeId: Scalars['Int']
};


export type MutationAddCommentArgs = {
  aquascapeId: Scalars['Int'],
  entity: CommentEntityType,
  entityId: Scalars['Int'],
  content: Scalars['String'],
  parentCommentId?: Maybe<Scalars['Int']>
};


export type MutationRemoveCommentArgs = {
  id: Scalars['Int']
};


export type MutationReadNotificationsArgs = {
  notifierId: Scalars['Int']
};


export type MutationFollowUserArgs = {
  userId: Scalars['Int']
};


export type MutationUnfollowUserArgs = {
  userId: Scalars['Int']
};


export type MutationLoginArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationRegisterArgs = {
  email: Scalars['String'],
  password: Scalars['String'],
  name: Scalars['String']
};


export type MutationFbRegisterArgs = {
  token: Scalars['String']
};


export type MutationGoogleRegisterArgs = {
  token: Scalars['String']
};


export type MutationResendConfirmationMailArgs = {
  email: Scalars['String']
};


export type MutationVisitAquascapeArgs = {
  aquascapeId: Scalars['Int']
};

export type Notification = {
   __typename?: 'Notification',
  creator?: Maybe<User>,
  like?: Maybe<Like>,
  comment?: Maybe<Comment>,
  id: Scalars['Int'],
  type: NotificationType,
  createdAt: Scalars['Int'],
};

export type NotificationsResult = {
   __typename?: 'NotificationsResult',
  rows: Array<Notifier>,
  count: Scalars['Int'],
};

export enum NotificationStatus {
  Read = 'READ',
  Unread = 'UNREAD'
}

export enum NotificationType {
  Like = 'LIKE',
  Follow = 'FOLLOW',
  Comment = 'COMMENT',
  Reply = 'REPLY'
}

export type Notifier = {
   __typename?: 'Notifier',
  id: Scalars['Int'],
  notification: Notification,
  status: NotificationStatus,
  createdAt: Scalars['String'],
};

export type Pagination = {
  limit?: Maybe<Scalars['Int']>,
  cursor?: Maybe<Scalars['String']>,
  offset?: Maybe<Scalars['Int']>,
};

export type Plant = {
   __typename?: 'Plant',
  id: Scalars['Int'],
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
  origin?: Maybe<Scalars['String']>,
  minHeight?: Maybe<Scalars['Int']>,
  maxHeight?: Maybe<Scalars['Int']>,
  position?: Maybe<Scalars['String']>,
  luminosity?: Maybe<Scalars['String']>,
  growthSpeed?: Maybe<Scalars['String']>,
  difficulty?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  me: User,
  user?: Maybe<User>,
  userBySlug?: Maybe<User>,
  users: Array<Maybe<User>>,
  filters: Array<Filter>,
  lights: Array<Light>,
  plants: Array<Plant>,
  hardscape: Array<Hardscape>,
  livestock: Array<Livestock>,
  substrates: Array<Substrate>,
  additives: Array<Additive>,
  aquascapes: AquascapesResult,
  trendingAquascapes: Array<Aquascape>,
  featuredAquascape?: Maybe<Aquascape>,
  aquascape?: Maybe<Aquascape>,
  brands: Array<Brand>,
  comments: Array<Comment>,
  notifications: NotificationsResult,
  unreadNotificationsCount: Scalars['Int'],
  userProfileSlugExists?: Maybe<Scalars['Boolean']>,
};


export type QueryUserArgs = {
  id: Scalars['Int']
};


export type QueryUserBySlugArgs = {
  slug: Scalars['String']
};


export type QueryAquascapesArgs = {
  pagination: Pagination,
  userId?: Maybe<Scalars['Int']>,
  random?: Maybe<Scalars['Boolean']>
};


export type QueryTrendingAquascapesArgs = {
  pagination: Pagination
};


export type QueryAquascapeArgs = {
  id: Scalars['Int']
};


export type QueryCommentsArgs = {
  entity: CommentEntityType,
  entityId: Scalars['Int'],
  pagination: Pagination
};


export type QueryNotificationsArgs = {
  pagination: Pagination
};


export type QueryUserProfileSlugExistsArgs = {
  slug: Scalars['String']
};

export type Substrate = Equipment & {
   __typename?: 'Substrate',
  id: Scalars['Int'],
  predefined: Scalars['Boolean'],
  model: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
  brand?: Maybe<Brand>,
};

export type Tag = {
   __typename?: 'Tag',
  id: Scalars['Int'],
  predefined: Scalars['Boolean'],
  name: Scalars['String'],
};

export type Tank = {
   __typename?: 'Tank',
  id: Scalars['Int'],
  volume?: Maybe<Scalars['Float']>,
  width?: Maybe<Scalars['Float']>,
  height?: Maybe<Scalars['Float']>,
  depth?: Maybe<Scalars['Float']>,
  glassThickness?: Maybe<Scalars['Float']>,
};


export type User = {
   __typename?: 'User',
  id: Scalars['Int'],
  slug: Scalars['String'],
  name: Scalars['String'],
  about?: Maybe<Scalars['String']>,
  profileImage?: Maybe<Scalars['String']>,
  profileImagePublicId?: Maybe<Scalars['String']>,
  coverImage?: Maybe<Scalars['String']>,
  coverImagePublicId?: Maybe<Scalars['String']>,
  country?: Maybe<Scalars['String']>,
  facebookUrl?: Maybe<Scalars['String']>,
  youtubeUrl?: Maybe<Scalars['String']>,
  instagramUrl?: Maybe<Scalars['String']>,
  twitterUrl?: Maybe<Scalars['String']>,
  createdAt: Scalars['String'],
  updatedAt: Scalars['String'],
  aquascapes: AquascapesResult,
  follows: FollowResult,
};


export type UserAquascapesArgs = {
  pagination: Pagination,
  random?: Maybe<Scalars['Boolean']>
};

export type UserDetails = {
  name?: Maybe<Scalars['String']>,
  about?: Maybe<Scalars['String']>,
  facebookUrl?: Maybe<Scalars['String']>,
  youtubeUrl?: Maybe<Scalars['String']>,
  instagramUrl?: Maybe<Scalars['String']>,
  twitterUrl?: Maybe<Scalars['String']>,
};

export type VisitAquascapeResult = {
   __typename?: 'VisitAquascapeResult',
  visitor: Visitor,
  created?: Maybe<Scalars['Boolean']>,
};

export type Visitor = {
   __typename?: 'Visitor',
  id: Scalars['Int'],
  visitorId: Scalars['String'],
  aquascapeId: Scalars['Int'],
};

export type AquascapeDetailsQueryVariables = {
  id: Scalars['Int']
};


export type AquascapeDetailsQuery = (
  { __typename?: 'Query' }
  & { aquascapes: (
    { __typename?: 'AquascapesResult' }
    & { rows: Array<(
      { __typename?: 'Aquascape' }
      & AquascapeFieldsFragment
    )> }
  ), aquascape: Maybe<(
    { __typename?: 'Aquascape' }
    & Pick<Aquascape, 'id' | 'title' | 'mainImageUrl' | 'viewsCount'>
    & { likes: (
      { __typename?: 'Likes' }
      & Pick<Likes, 'count'>
      & { rows: Array<(
        { __typename?: 'Like' }
        & Pick<Like, 'id'>
        & { user: (
          { __typename?: 'User' }
          & Pick<User, 'id' | 'name' | 'profileImage' | 'slug' | 'createdAt'>
        ) }
      )> }
    ), plants: Array<(
      { __typename?: 'Plant' }
      & Pick<Plant, 'id' | 'name'>
    )>, livestock: Array<(
      { __typename?: 'Livestock' }
      & Pick<Livestock, 'id' | 'name'>
    )>, hardscape: Array<(
      { __typename?: 'Hardscape' }
      & Pick<Hardscape, 'id' | 'name'>
    )>, lights: Array<(
      { __typename?: 'Light' }
      & Pick<Light, 'id' | 'model'>
      & { brand: Maybe<(
        { __typename?: 'Brand' }
        & Pick<Brand, 'id' | 'name'>
      )> }
    )>, filters: Array<(
      { __typename?: 'Filter' }
      & Pick<Filter, 'id' | 'model'>
      & { brand: Maybe<(
        { __typename?: 'Brand' }
        & Pick<Brand, 'id' | 'name'>
      )> }
    )>, co2: Maybe<(
      { __typename?: 'CO2' }
      & Pick<Co2, 'id' | 'type' | 'bps'>
    )>, substrates: Array<(
      { __typename?: 'Substrate' }
      & Pick<Substrate, 'id' | 'model'>
      & { brand: Maybe<(
        { __typename?: 'Brand' }
        & Pick<Brand, 'id' | 'name'>
      )> }
    )>, additives: Array<(
      { __typename?: 'Additive' }
      & Pick<Additive, 'id' | 'model'>
      & { brand: Maybe<(
        { __typename?: 'Brand' }
        & Pick<Brand, 'id' | 'name'>
      )> }
    )>, tags: Array<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'name'>
    )>, images: Array<(
      { __typename?: 'AquascapeImage' }
      & Pick<AquascapeImage, 'id' | 'title' | 'url' | 'createdAt'>
    )>, user: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'profileImage' | 'slug'>
      & { aquascapes: (
        { __typename?: 'AquascapesResult' }
        & { rows: Array<(
          { __typename?: 'Aquascape' }
          & AquascapeFieldsFragment
        )> }
      ) }
    )>, comments: Array<(
      { __typename?: 'Comment' }
      & CommentFieldsFragment
    )> }
  )> }
);

export type FiltersQueryVariables = {};


export type FiltersQuery = (
  { __typename?: 'Query' }
  & { filters: Array<(
    { __typename?: 'Filter' }
    & Pick<Filter, 'id' | 'model'>
    & { brand: Maybe<(
      { __typename?: 'Brand' }
      & Pick<Brand, 'id' | 'name'>
    )> }
  )> }
);

export type LightsQueryVariables = {};


export type LightsQuery = (
  { __typename?: 'Query' }
  & { lights: Array<(
    { __typename?: 'Light' }
    & Pick<Light, 'id' | 'model'>
    & { brand: Maybe<(
      { __typename?: 'Brand' }
      & Pick<Brand, 'id' | 'name'>
    )> }
  )> }
);

export type SubstratesQueryVariables = {};


export type SubstratesQuery = (
  { __typename?: 'Query' }
  & { substrates: Array<(
    { __typename?: 'Substrate' }
    & Pick<Substrate, 'id' | 'model'>
    & { brand: Maybe<(
      { __typename?: 'Brand' }
      & Pick<Brand, 'id' | 'name'>
    )> }
  )> }
);

export type AdditivesQueryVariables = {};


export type AdditivesQuery = (
  { __typename?: 'Query' }
  & { additives: Array<(
    { __typename?: 'Additive' }
    & Pick<Additive, 'id' | 'model'>
    & { brand: Maybe<(
      { __typename?: 'Brand' }
      & Pick<Brand, 'id' | 'name'>
    )> }
  )> }
);

export type HardscapeQueryVariables = {};


export type HardscapeQuery = (
  { __typename?: 'Query' }
  & { hardscape: Array<(
    { __typename?: 'Hardscape' }
    & Pick<Hardscape, 'id' | 'name'>
  )> }
);

export type LivestockQueryVariables = {};


export type LivestockQuery = (
  { __typename?: 'Query' }
  & { livestock: Array<(
    { __typename?: 'Livestock' }
    & Pick<Livestock, 'id' | 'name'>
  )> }
);

export type PlantsQueryVariables = {};


export type PlantsQuery = (
  { __typename?: 'Query' }
  & { plants: Array<(
    { __typename?: 'Plant' }
    & Pick<Plant, 'id' | 'name'>
  )> }
);

export type UnreadNotificationsCountQueryVariables = {};


export type UnreadNotificationsCountQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'unreadNotificationsCount'>
);

export type NotificationsQueryVariables = {
  pagination: Pagination
};


export type NotificationsQuery = (
  { __typename?: 'Query' }
  & { notifications: (
    { __typename?: 'NotificationsResult' }
    & Pick<NotificationsResult, 'count'>
    & { rows: Array<(
      { __typename?: 'Notifier' }
      & Pick<Notifier, 'id' | 'status' | 'createdAt'>
      & { notification: (
        { __typename?: 'Notification' }
        & Pick<Notification, 'id' | 'type'>
        & { like: Maybe<(
          { __typename?: 'Like' }
          & Pick<Like, 'id'>
          & { aquascape: Maybe<(
            { __typename?: 'Aquascape' }
            & Pick<Aquascape, 'id' | 'title'>
          )>, comment: Maybe<(
            { __typename?: 'Comment' }
            & Pick<Comment, 'id'>
            & { aquascape: Maybe<(
              { __typename?: 'Aquascape' }
              & Pick<Aquascape, 'id' | 'title'>
            )> }
          )> }
        )>, comment: Maybe<(
          { __typename?: 'Comment' }
          & Pick<Comment, 'id' | 'content'>
          & { aquascape: Maybe<(
            { __typename?: 'Aquascape' }
            & Pick<Aquascape, 'id' | 'title'>
          )> }
        )>, creator: Maybe<(
          { __typename?: 'User' }
          & Pick<User, 'id' | 'slug' | 'name' | 'profileImage'>
        )> }
      ) }
    )> }
  ) }
);

export type AquascapeFieldsFragment = (
  { __typename?: 'Aquascape' }
  & Pick<Aquascape, 'id' | 'createdAt' | 'title' | 'mainImageUrl' | 'viewsCount' | 'likesCount'>
  & { tags: Array<(
    { __typename?: 'Tag' }
    & Pick<Tag, 'name'>
  )>, images: Array<(
    { __typename?: 'AquascapeImage' }
    & Pick<AquascapeImage, 'id' | 'url'>
  )>, user: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'profileImage' | 'slug'>
  )> }
);

export type CommentFieldsFragment = (
  { __typename?: 'Comment' }
  & Pick<Comment, 'id' | 'content' | 'createdAt' | 'parentCommentId'>
  & { likes: Array<(
    { __typename?: 'Like' }
    & Pick<Like, 'id' | 'userId'>
  )>, user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'slug' | 'profileImage'>
  ) }
);

export type User_ProfileQueryVariables = {};


export type User_ProfileQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'slug' | 'name' | 'country' | 'profileImage'>
    & { follows: (
      { __typename?: 'FollowResult' }
      & { followers: (
        { __typename?: 'Followers' }
        & Pick<Followers, 'count'>
        & { rows: Array<(
          { __typename?: 'Follow' }
          & Pick<Follow, 'id' | 'followerUserId'>
        )> }
      ), following: (
        { __typename?: 'Following' }
        & Pick<Following, 'count'>
        & { rows: Array<(
          { __typename?: 'Follow' }
          & Pick<Follow, 'id' | 'followedUserId'>
        )> }
      ) }
    ), aquascapes: (
      { __typename?: 'AquascapesResult' }
      & Pick<AquascapesResult, 'count'>
    ) }
  ) }
);

export type AquascapesQueryVariables = {
  pagination: Pagination,
  userId?: Maybe<Scalars['Int']>
};


export type AquascapesQuery = (
  { __typename?: 'Query' }
  & { aquascapes: (
    { __typename?: 'AquascapesResult' }
    & Pick<AquascapesResult, 'count'>
    & { rows: Array<(
      { __typename?: 'Aquascape' }
      & AquascapeFieldsFragment
    )> }
  ) }
);

export type FeaturedAquascapesQueryVariables = {};


export type FeaturedAquascapesQuery = (
  { __typename?: 'Query' }
  & { featured: Maybe<(
    { __typename?: 'Aquascape' }
    & AquascapeFieldsFragment
  )> }
);

export type TrendingAquascapesQueryVariables = {
  pagination: Pagination
};


export type TrendingAquascapesQuery = (
  { __typename?: 'Query' }
  & { trending: Array<(
    { __typename?: 'Aquascape' }
    & AquascapeFieldsFragment
  )> }
);

export type UserBySlugQueryVariables = {
  slug: Scalars['String'],
  pagination: Pagination
};


export type UserBySlugQuery = (
  { __typename?: 'Query' }
  & { user: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'slug' | 'name' | 'about' | 'profileImage' | 'profileImagePublicId' | 'coverImage' | 'coverImagePublicId' | 'facebookUrl' | 'youtubeUrl' | 'instagramUrl' | 'twitterUrl'>
    & { follows: (
      { __typename?: 'FollowResult' }
      & { followers: (
        { __typename?: 'Followers' }
        & Pick<Followers, 'count'>
        & { rows: Array<(
          { __typename?: 'Follow' }
          & Pick<Follow, 'id' | 'followerUserId'>
        )> }
      ), following: (
        { __typename?: 'Following' }
        & Pick<Following, 'count'>
        & { rows: Array<(
          { __typename?: 'Follow' }
          & Pick<Follow, 'id' | 'followedUserId'>
        )> }
      ) }
    ), aquascapes: (
      { __typename?: 'AquascapesResult' }
      & Pick<AquascapesResult, 'count'>
      & { rows: Array<(
        { __typename?: 'Aquascape' }
        & AquascapeFieldsFragment
      )> }
    ) }
  )> }
);
