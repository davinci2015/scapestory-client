import gql from 'graphql-tag'

export const fragments = {
    aquascape: gql`
        fragment AquascapeFields on Aquascape {
            id
            createdAt
            title
            mainImageUrl
            viewsCount
            likesCount
            tags {
                name
            }

            images {
                id
                url
            }

            user {
                id
                name
                profileImage
                slug
            }
        }
    `,
    comments: gql`
        fragment CommentFields on Comment {
            id
            content
            createdAt
            parentCommentId
            likes {
                id
                userId
            }
            user {
                id
                name
                slug
                profileImage
            }
        }
    `,
}

export const USER_PROFILE = gql`
    query USER_PROFILE {
        me {
            id
            slug
            name
            country
            profileImage
            follows {
                followers {
                    count
                    rows {
                        id
                        followerUserId
                    }
                }
                following {
                    count
                    rows {
                        id
                        followedUserId
                    }
                }
            }
            aquascapes(pagination: {limit: 0}) {
                count
            }
        }
    }
`

export const AQUASCAPES = gql`
    query Aquascapes($pagination: Pagination!, $userId: Int) {
        aquascapes(pagination: $pagination, userId: $userId) {
            count
            rows {
                ...AquascapeFields
            }
        }
    }
    ${fragments.aquascape}
`

export const FEATURED_AQUASCAPE = gql`
    query FeaturedAquascapes {
        featured: featuredAquascape {
            ...AquascapeFields
        }
    }
    ${fragments.aquascape}
`

export const TRENDING_AQUASCAPES = gql`
    query TrendingAquascapes($pagination: Pagination!) {
        trending: trendingAquascapes(pagination: $pagination) {
            ...AquascapeFields
        }
    }
    ${fragments.aquascape}
`

export const USER_BY_SLUG = gql`
    query UserBySlug($slug: String!, $pagination: Pagination!) {
        user: userBySlug(slug: $slug) {
            id
            slug
            name
            about

            profileImage
            profileImagePublicId
            coverImage
            coverImagePublicId

            facebookUrl
            youtubeUrl
            instagramUrl
            twitterUrl

            follows {
                followers {
                    count
                    rows {
                        id
                        followerUserId
                        follower {
                            id
                            slug
                            name
                            profileImage
                            createdAt
                        }
                    }
                }
                following {
                    count
                    rows {
                        id
                        followedUserId
                        followed {
                            id
                            slug
                            name
                            profileImage
                            createdAt
                        }
                    }
                }
            }

            aquascapes(pagination: $pagination) {
                count
                rows {
                    ...AquascapeFields
                }
            }
        }
    }
    ${fragments.aquascape}
`
