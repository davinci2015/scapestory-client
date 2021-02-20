import gql from 'graphql-tag'

export const UNREAD_NOTIFICATIONS_COUNT = gql`
    query unreadNotificationsCount {
        unreadNotificationsCount
    }
`
