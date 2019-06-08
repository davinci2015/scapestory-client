import {ModuleContext} from '@graphql-modules/core'
import {tokens} from 'di/tokens'
import {SessionContext} from 'graphql/context'
import {AuthProviderInterface} from 'graphql/modules/Auth/providers/AuthProvider'

type LoginArgsType = {
    email: string,
    password: string
}

type RegisterArgsType = {
    email: string,
    username: string,
    password: string
}

type FBRegisterArgsType = {
    token: string
}

type GoogleRegisterArgsType = {
    token: string
}

type UsernameExistsArgsType = {
    email: string,
    username: string,
    password: string
}

export const resolvers = {
    Query: {
        async usernameExists(root, args: UsernameExistsArgsType, {injector}: ModuleContext) {
            const provider: AuthProviderInterface = injector.get(tokens.AUTH_PROVIDER)
            return await provider.usernameExists(args.username)
        }
    },
    Mutation: {
        async login(root, args: LoginArgsType, context: ModuleContext) {
            console.log(context)
            const provider: AuthProviderInterface = context.injector.get(tokens.AUTH_PROVIDER)
            return await provider.login(args.email, args.password)
        },
        async register(root, args: RegisterArgsType, {injector}: ModuleContext) {
            const provider: AuthProviderInterface = injector.get(tokens.AUTH_PROVIDER)
            return await provider.register(args.email, args.username, args.password)
        },
        async fbRegister(root, args: FBRegisterArgsType, {injector, req, res}: ModuleContext & SessionContext) {
            const provider: AuthProviderInterface = injector.get(tokens.AUTH_PROVIDER)
            return await provider.facebookRegister(args.token, req, res)
        },
        async googleRegister(root, args: GoogleRegisterArgsType, {injector, req, res}: ModuleContext & SessionContext) {
            const provider: AuthProviderInterface = injector.get(tokens.AUTH_PROVIDER)
            return await provider.googleRegister(args.token, req, res)
        }
    }
}