import gql from 'graphql-tag'

export interface Pagination {
    limit: number
    offset: number
}

export interface AquascapesFilter {
    trending: boolean
}

export interface AquascapeData {
    id: string
    title: string
    slug: string
    mainImage: string
    viewsCount: number
    likesCount: number
    tags: [{
        name: string
    }]
    user: {
        name?: string
        profileImage?: string
        username: string
    }
}

const fragments = {
    aquascape: gql`
        fragment AquascapeFields on Aquascape {
            id 
            title
            mainImage
            viewsCount
            likesCount
            tags {  
                name
            }

            user {
                name
                profileImage
                username
            }
        }
    `
}

export const QUERY_RECENT_AQUASCAPES = gql`
    query RecentAquascapes($pagination: Pagination!) {
        aquascapes(pagination: $pagination) {
            ...AquascapeFields
        }
    }
    ${fragments.aquascape}
`

export const QUERY_TRENDING_AND_FEATURED_AQUASCAPES = gql`
    query Aquascapes($pagination: Pagination!) {
        trending: trendingAquascapes(pagination: $pagination) {
            ...AquascapeFields
        }
        featured: featuredAquascape {
            ...AquascapeFields
        }
    }
    ${fragments.aquascape}
`