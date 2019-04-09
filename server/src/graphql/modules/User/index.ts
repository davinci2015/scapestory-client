import {GraphQLModule} from '@graphql-modules/core'
import {UsersProvider} from 'graphql/modules/User/providers/UsersProvider'
import {resolvers, resolversComposition} from 'graphql/modules/User/resolvers'
import {UserRepository} from 'db/repositories/UserRepository'
import {composeContext, context} from 'graphql/context'
import {tokens} from 'di/tokens'
import * as typeDefs from 'graphql/modules/User/schema.graphql'

export const UserModule = new GraphQLModule({
    providers: [
        {provide: tokens.USERS_PROVIDER, useClass: UsersProvider},
        {provide: tokens.USER_REPOSITORY, useClass: UserRepository},
    ],
    typeDefs,
    resolvers,
    resolversComposition,
    // @ts-ignore
    context: composeContext([
        context.attachCurrentUser
    ])
})