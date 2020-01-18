import gql from 'graphql-tag'
import {fragments} from 'graphql/queries'

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
