import gql from 'graphql-tag'

export const NOTIFICATIONS = gql`
    query notifications($pagination: Pagination!) {
        notifications(pagination: $pagination) {
            id
            status
            createdAt

            notification {
                id
                type

                like {
                    id
                    aquascape {
                        id
                        title
                    }

                    comment {
                        id
                        aquascape {
                            id
                            title
                        }
                    }
                }

                comment {
                    id
                    content
                    aquascape {
                        id
                        title
                    }
                }

                creator {
                    id
                    slug
                    name
                    profileImage
                }
            }
        }
    }
`
