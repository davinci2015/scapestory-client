import gql from 'graphql-tag'

export const READ_NOTIFICATIONS = gql`
    mutation readNotifications($notifierId: Int!) {
        readNotifications(notifierId: $notifierId)
    }
`
