import gql from 'graphql-tag'
import React from 'react'
import {useMutation} from 'react-apollo'
import {ReactFacebookFailureResponse, ReactFacebookLoginInfo} from 'react-facebook-login'
// @ts-ignore
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import logger from 'services/logger'

const LOGIN = gql`
    mutation Login($token: String!) {
        fbRegister(token: $token) {
            token
        }
    }
`

export interface FacebookProps {
    onClick(): void
}

interface Props {
    children: (props: FacebookProps) => React.ReactElement
    onSuccess: (token: string) => void
}

const Login = ({children, onSuccess}: Props) => {
    const [login] = useMutation(LOGIN)

    const responseFacebook = async (response: ReactFacebookLoginInfo) => {
        const res = await login({variables: {token: response.accessToken}})
        if (res && res.data) {
            onSuccess(res.data.fbRegister.token)
        }
    }

    const onFailure = (response: ReactFacebookFailureResponse) =>
        logger.warn(`Failed to login with FB with status ${response.status}`)

    return (
        <FacebookLogin
            appId={process.env.FACEBOOK_APP_ID}
            fields="name,email,picture"
            disableMobileRedirect={true}
            callback={responseFacebook}
            onFailure={onFailure}
            render={children}
        />
    )
}

export default Login
