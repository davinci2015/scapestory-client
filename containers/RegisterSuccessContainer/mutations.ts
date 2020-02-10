import gql from 'graphql-tag'

export const RESEND_EMAIL = gql`
    mutation resendConfirmationMail($email: String!) {
        resendConfirmationMail(email: $email)
    }
`
