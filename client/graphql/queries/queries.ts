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
            email
            slug
            name
            country
            profileImage
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
            email
            slug
            name
            country
            about

            profileImage
            profileImagePublicId
            coverImage
            coverImagePublicId

            facebookUrl
            youtubeUrl
            instagramUrl
            twitterUrl

            followersCount
            followingCount
            isFollowedByMe

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
