import {DataProxy} from 'apollo-cache'
import {FetchResult} from 'apollo-link'
import gql from 'graphql-tag'

import {Follow} from 'graphql/generated/mutations'
import {USER_PROFILE, USER_BY_SLUG} from 'graphql/queries'

export enum ProfileActions {
    FOLLOW,
    UNFOLLOW,
    UPLOAD_COVER_IMAGE,
    UPLOAD_PROFILE_IMAGE,
}

interface Payload {
    slug?: string
    [key: string]: any
}

export const updateProfileCache = (action: ProfileActions, payload: Payload = {}) => (
    cache: DataProxy,
    mutationResult: FetchResult<any>
) => {
    const mutationData = mutationResult.data
    let query
    let data

    if (!mutationData) return

    switch (action) {
        case ProfileActions.FOLLOW:
            query = USER_PROFILE
            data = cache.readQuery<any>({query})

            cache.writeQuery({
                query,
                data: {
                    me: {
                        ...data.me,
                        follows: {
                            ...data.me.follows,
                            following: {
                                count: data.me.follows.following.count + 1,
                                rows: [...data.me.follows.following.rows, mutationData.followUser],
                                __typename: 'Following',
                            },
                            __typename: 'FollowResult',
                        },
                    },
                },
            })

            if (payload.slug) {
                query = USER_BY_SLUG
                data = cache.readQuery<any>({
                    query,
                    variables: {slug: payload.slug, pagination: {cursor: null}},
                })

                cache.writeQuery({
                    query,
                    data: {
                        user: {
                            ...data.user,
                            follows: {
                                ...data.user.follows,
                                followers: {
                                    count: data.user.follows.followers.count + 1,
                                    rows: [
                                        ...data.user.follows.followers.rows,
                                        mutationData.followUser,
                                    ],
                                    __typename: 'Followers',
                                },
                                __typename: 'FollowResult',
                            },
                        },
                    },
                })
            }

            return

        case ProfileActions.UNFOLLOW:
            query = USER_PROFILE
            data = cache.readQuery<any>({query})

            cache.writeQuery({
                query,
                data: {
                    me: {
                        ...data.me,
                        follows: {
                            ...data.me.follows,
                            following: {
                                count: data.me.follows.following.count - 1,
                                rows: data.me.follows.following.rows.filter(
                                    (follow: Follow) => follow.id !== mutationData.unfollowUser.id
                                ),
                                __typename: 'Following',
                            },
                            __typename: 'FollowResult',
                        },
                    },
                },
            })

            if (payload.slug) {
                query = USER_BY_SLUG
                data = cache.readQuery<any>({
                    query,
                    variables: {slug: payload.slug, pagination: {cursor: null}},
                })

                cache.writeQuery({
                    query,
                    data: {
                        user: {
                            ...data.user,
                            follows: {
                                ...data.user.follows,
                                followers: {
                                    count: data.user.follows.followers.count - 1,
                                    rows: data.user.follows.followers.rows.filter(
                                        (follow: Follow) =>
                                            follow.id !== mutationData.unfollowUser.id
                                    ),
                                    __typename: 'Followers',
                                },
                                __typename: 'FollowResult',
                            },
                        },
                    },
                })
            }

            return

        case ProfileActions.UPLOAD_COVER_IMAGE:
            query = gql`query { userBySlug(slug: "${payload.slug}") { id coverImage coverImagePublicId }}`
            data = cache.readQuery<any>({query})

            if (!mutationData.uploadUserImage.imageUrl) return

            return cache.writeQuery({
                query,
                data: {
                    userBySlug: {
                        ...data.userBySlug,
                        coverImage: mutationData.uploadUserImage.imageUrl,
                        coverImagePublicId: mutationData.uploadUserImage.imagePublicId,
                    },
                },
            })

        case ProfileActions.UPLOAD_PROFILE_IMAGE:
            query = gql`query { userBySlug(slug: "${payload.slug}") { id profileImage profileImagePublicId }}`
            data = cache.readQuery<any>({query})

            if (!mutationData.uploadUserImage.imageUrl) return

            return cache.writeQuery({
                query,
                data: {
                    userBySlug: {
                        ...data.userBySlug,
                        profileImage: mutationData.uploadUserImage.imageUrl,
                        profileImagePublicId: mutationData.uploadUserImage.imagePublicId,
                    },
                },
            })

        default:
            return null
    }
}
