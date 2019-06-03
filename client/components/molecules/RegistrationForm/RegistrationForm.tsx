import appConstants from 'appConstants'
import React, {useState} from 'react'
import gql from 'graphql-tag'
import {Mutation} from 'react-apollo/index'
import Router from 'next/router'
import Button from 'components/atoms/Button'
import Input from 'components/atoms/Input/Input'
import routes from 'routes'
import PasswordInput from 'components/atoms/PasswordInput'
import Cookies from 'universal-cookie/es6'

const SIGN_UP = gql`
    mutation SignUp($email: String!, $username: String!, $password: String!) {
        register(email: $email, username: $username, password: $password) {
            token
        }
    }
`

interface Data {
    register: {
        token: string
    }
}

interface Variables {
    email: string
    username: string
    password: string
}

const RegistrationForm = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onCompleted = (data: Data) => {
        const cookies = new Cookies()
        cookies.set(appConstants.COOKIE_AUTH, data.register.token)
        Router.push(routes.index)
    }

    return (
        <Mutation<Data, Variables>
            onCompleted={onCompleted}
            mutation={SIGN_UP}>
            {(register) => (
                <form>
                    <Input
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Input
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <PasswordInput
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <Button
                        onClick={() => {
                            register({
                                variables: {email, username, password}
                            })
                        }}>
                        Sign Up
                    </Button>
                </form>
            )}
        </Mutation>
    )
}

export default RegistrationForm