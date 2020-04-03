import gql from 'graphql-tag'
import {DataProxy} from 'apollo-cache'
import {FetchResult} from 'apollo-link'
import {Like} from 'graphql/generated/mutations'

import {AQUASCAPE_DETAILS} from 'containers/AquascapeDetailsContainer/queries'
import {Comment} from 'graphql/generated/types'

export enum AquascapeDetailsActions {
    AQUASCAPE_LIKE,
    AQUASCAPE_DISLIKE,
    AQUASCAPE_LIKE_COMMENT,
    AQUASCAPE_DISLIKE_COMMENT,
    AQUASCAPE_ADD_COMMENT,
    AQUASCAPE_REMOVE_COMMENT,
    AQUASCAPE_VISIT,
    AQUASCAPE_UPDATE_MAIN_IMAGE,
}

interface Payload {
    aquascapeId: number
    [key: string]: any
}

export const updateAquascapeDetailsCache = (action: AquascapeDetailsActions, payload: Payload) => (
    cache: DataProxy,
    mutationResult: FetchResult<any>
) => {
    const mutationData = mutationResult.data
    let query
    let data

    if (!mutationData) return

    switch (action) {
        case AquascapeDetailsActions.AQUASCAPE_LIKE:
            query = AQUASCAPE_DETAILS
            data = cache.readQuery<any>({query, variables: {id: payload.aquascapeId}})

            return cache.writeQuery({
                query,
                variables: {id: payload.aquascapeId},
                data: {
                    ...data,
                    aquascape: {
                        ...data.aquascape,
                        likes: {
                            count: data.aquascape.likes.count + 1,
                            rows: [...data.aquascape.likes.rows, mutationData.like],
                            __typename: 'Likes',
                        },
                        __typename: 'Aquascape',
                    },
                },
            })

        case AquascapeDetailsActions.AQUASCAPE_DISLIKE:
            query = AQUASCAPE_DETAILS
            data = cache.readQuery<any>({query, variables: {id: payload.aquascapeId}})

            return cache.writeQuery({
                query,
                variables: {id: payload.aquascapeId},
                data: {
                    ...data,
                    aquascape: {
                        ...data.aquascape,
                        likes: {
                            count: data.aquascape.likes.count - 1,
                            rows: data.aquascape.likes.rows.filter(
                                (like: Like) => like.id !== mutationData.dislike.id
                            ),
                            __typename: 'Likes',
                        },
                        __typename: 'Aquascape',
                    },
                },
            })

        case AquascapeDetailsActions.AQUASCAPE_LIKE_COMMENT:
            query = gql`query { aquascape(id: ${payload.aquascapeId}) { id comments { id likes { id userId } } }}`
            data = cache.readQuery<any>({query})

            return cache.writeQuery({
                query,
                data: {
                    aquascape: {
                        ...data.aquascape,
                        comments: data.aquascape.comments.map((comment: Comment) =>
                            comment.id === mutationData.like.commentId
                                ? {
                                      ...comment,
                                      likes: [...comment.likes, mutationData.like],
                                  }
                                : comment
                        ),
                    },
                },
            })

        case AquascapeDetailsActions.AQUASCAPE_DISLIKE_COMMENT:
            query = gql`query { aquascape(id: ${payload.aquascapeId}) { id comments { id likes { id userId } } }}`
            data = cache.readQuery<any>({query})

            return cache.writeQuery({
                query,
                data: {
                    aquascape: {
                        ...data.aquascape,
                        comments: data.aquascape.comments.map((comment: Comment) =>
                            comment.id === mutationData.dislike.commentId
                                ? {
                                      ...comment,
                                      likes: comment.likes.filter(
                                          like => like.id !== mutationData.dislike.id
                                      ),
                                  }
                                : comment
                        ),
                    },
                },
            })

        case AquascapeDetailsActions.AQUASCAPE_ADD_COMMENT:
            query = gql`query { aquascape(id: ${payload.aquascapeId}) { id comments { id likes { id } user { id } } }}`
            data = cache.readQuery<any>({query})

            return cache.writeQuery({
                query,
                data: {
                    aquascape: {
                        ...data.aquascape,
                        comments: [
                            {
                                ...mutationData.addComment,
                                likes: [],
                                user: payload.user,
                            },
                            ...data.aquascape.comments,
                        ],
                    },
                },
            })

        case AquascapeDetailsActions.AQUASCAPE_REMOVE_COMMENT:
            query = gql`query { aquascape(id: ${payload.aquascapeId}) { id comments { id } }}`
            data = cache.readQuery<any>({query})

            return cache.writeQuery({
                query,
                data: {
                    aquascape: {
                        ...data.aquascape,
                        comments: data.aquascape.comments.filter(
                            (comment: Comment) => comment.id !== mutationData.removeComment.id
                        ),
                    },
                },
            })

        case AquascapeDetailsActions.AQUASCAPE_VISIT:
            query = gql`query { aquascape(id: ${payload.aquascapeId}) { id viewsCount }}`
            data = cache.readQuery<any>({query})

            if (mutationData?.visitAquascape?.created) {
                cache.writeQuery({
                    query,
                    data: {
                        aquascape: {
                            ...data.aquascape,
                            viewsCount: data.aquascape.viewsCount + 1,
                        },
                    },
                })
            }

            return

        case AquascapeDetailsActions.AQUASCAPE_UPDATE_MAIN_IMAGE:
            query = gql`query { aquascape(id: ${payload.aquascapeId}) { id mainImageUrl }}`
            data = cache.readQuery<any>({query})

            if (mutationData?.updateAquascapeMainImage) {
                cache.writeQuery({
                    query,
                    data: {
                        aquascape: {
                            ...data.aquascape,
                            mainImageUrl: mutationData.updateAquascapeMainImage.mainImageUrl,
                        },
                    },
                })
            }

            return

        default:
            return null
    }
}
