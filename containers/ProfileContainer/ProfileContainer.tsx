import React, {useContext} from 'react'
import {useRouter} from 'next/router'
import {useQuery, useMutation} from 'react-apollo'

import {UserBySlugQuery, UserBySlugQueryVariables} from 'graphql/generated/queries'
import {Content, Grid} from 'components/core'
import {GridWidth} from 'components/core/Grid'
import routes, {createDynamicPath} from 'routes'
import {USER_BY_SLUG} from 'graphql/queries'

import CoverSectionContainer from './CoverSectionContainer'
import UserSectionContainer from './UserSectionContainer'
import AquascapesSection from 'components/sections/Profile/AquascapesSection.tsx'
import {renderAquascapeCards} from 'utils/render'
import {
    FollowUserMutation,
    FollowUserMutationVariables,
    UnfollowUserMutation,
    UnfollowUserMutationVariables,
} from 'graphql/generated/mutations'
import {updateProfileCache, ProfileActions} from './cache'
import {FOLLOW, UNFOLLOW} from 'graphql/mutations'
import {AuthContext} from 'providers/AuthenticationProvider'
import {isFollowedByCurrentUser} from 'utils/user'
import useAuthGuard from 'hooks/useAuthGuard'
import {analyticsEvents} from 'utils/analytics'

const ProfileContainer = () => {
    const router = useRouter()
    const slug = router.query.slug?.toString()
    const {user: currentUser} = useContext(AuthContext)
    const authGuard = useAuthGuard()

    if (!slug) return null

    const {data: userResult, error} = useQuery<UserBySlugQuery, UserBySlugQueryVariables>(
        USER_BY_SLUG,
        {variables: {slug, pagination: {cursor: null}}, fetchPolicy: 'cache-and-network'}
    )

    const [follow] = useMutation<FollowUserMutation, FollowUserMutationVariables>(FOLLOW, {
        update: updateProfileCache(ProfileActions.FOLLOW, {slug}),
    })

    const [unfollow] = useMutation<UnfollowUserMutation, UnfollowUserMutationVariables>(UNFOLLOW, {
        update: updateProfileCache(ProfileActions.UNFOLLOW, {slug}),
    })

    const toggleFollow = (userId: number) => {
        const isFollowed = currentUser && isFollowedByCurrentUser(currentUser, userId)
        const mutateFollow = isFollowed ? unfollow : follow

        mutateFollow({variables: {userId}})
    }

    if (error) {
        // TODO: handle error properly
        return null
    }

    if (!userResult || !userResult.user) {
        // TODO: handle not found user
        return null
    }

    const onEdit = () => router.push(createDynamicPath(routes.editProfile, {slug}))

    const authGuardedToggleFollow = authGuard(toggleFollow, analyticsEvents.anonymousUser.follow)

    return (
        <Content>
            <CoverSectionContainer
                currentUser={currentUser}
                toggleFollow={authGuardedToggleFollow}
                user={userResult.user}
                onEdit={onEdit}
            />
            <Grid width={GridWidth.SMALL}>
                <UserSectionContainer
                    currentUser={currentUser}
                    toggleFollow={authGuardedToggleFollow}
                    user={userResult.user}
                />
                {Boolean(userResult.user.aquascapes.rows.length) && (
                    <AquascapesSection name={userResult.user.name}>
                        <Grid.Row>
                            {renderAquascapeCards(userResult.user.aquascapes.rows, {
                                large: 6,
                                medium: 6,
                                small: 12,
                                extraSmall: 12,
                            })}
                        </Grid.Row>
                    </AquascapesSection>
                )}
            </Grid>
        </Content>
    )
}

export default ProfileContainer
