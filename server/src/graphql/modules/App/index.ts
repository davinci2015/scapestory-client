import {GraphQLModule} from '@graphql-modules/core'
import {AquascapeModule} from 'graphql/modules/Aquascape'
import {FollowModule} from 'graphql/modules/Follow'
import {UserModule} from 'graphql/modules/User'
import {AuthModule} from 'graphql/modules/Auth'
import {LightModule} from 'graphql/modules/Light'
import {CommentModule} from 'graphql/modules/Comment'

export const AppModule = new GraphQLModule({
    imports: [
        UserModule,
        AuthModule,
        FollowModule,
        AquascapeModule,
        LightModule,
        CommentModule
    ]
})