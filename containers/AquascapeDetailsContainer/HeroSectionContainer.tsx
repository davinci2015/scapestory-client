import React, {useContext, useMemo} from 'react'
import {useRouter} from 'next/router'
import {useMutation} from 'react-apollo'

import {LikeEntityType} from 'graphql/generated/types'
import {LIKE, DISLIKE, FOLLOW, UNFOLLOW} from 'graphql/mutations'
import {AuthContext} from 'providers/AuthenticationProvider'
import {
    updateAquascapeDetailsCache,
    AquascapeDetailsActions,
} from 'containers/AquascapeDetailsContainer/cache'
import {HeroSection} from 'components/sections/AquascapeDetails'
import {AquascapeDetailsQuery} from 'graphql/generated/queries'
import {
    LikeMutation,
    LikeMutationVariables,
    DislikeMutation,
    DislikeMutationVariables,
    FollowUserMutation,
    FollowUserMutationVariables,
    UnfollowUserMutation,
    UnfollowUserMutationVariables,
} from 'graphql/generated/mutations'
import routes, {createDynamicPath, getAquascapeDetailsSlug} from 'routes'
import config from 'config'
import {shareOnFacebook} from 'utils/general'
import {updateProfileCache, ProfileActions} from 'containers/ProfileContainer/cache'
import {isFollowedByCurrentUser} from 'utils/user'
import useAuthGuard from 'hooks/useAuthGuard'

interface Props {
    aquascape: AquascapeDetailsQuery['aquascape']
}

const HeroSectionContainer: React.FunctionComponent<Props> = ({aquascape}) => {
    const router = useRouter()
    const {user} = useContext(AuthContext)
    const authGuard = useAuthGuard()

    if (!aquascape) return null

    const isLikedByCurrentUser = useMemo(
        () => aquascape.likes.rows.some(like => like.user.id === user?.id),
        [aquascape, user]
    )

    const isFollowed = useMemo(
        () => !!user && !!aquascape?.user && isFollowedByCurrentUser(user, aquascape.user.id),
        [user, aquascape]
    )

    const [like] = useMutation<LikeMutation, LikeMutationVariables>(LIKE, {
        update: updateAquascapeDetailsCache(AquascapeDetailsActions.AQUASCAPE_LIKE, {
            aquascapeId: aquascape.id,
        }),
    })

    const [dislike] = useMutation<DislikeMutation, DislikeMutationVariables>(DISLIKE, {
        update: updateAquascapeDetailsCache(AquascapeDetailsActions.AQUASCAPE_DISLIKE, {
            aquascapeId: aquascape.id,
        }),
    })

    const [follow] = useMutation<FollowUserMutation, FollowUserMutationVariables>(FOLLOW, {
        update: updateProfileCache(ProfileActions.FOLLOW),
    })

    const [unfollow] = useMutation<UnfollowUserMutation, UnfollowUserMutationVariables>(UNFOLLOW, {
        update: updateProfileCache(ProfileActions.UNFOLLOW),
    })

    const toggleLike = () => {
        if (!aquascape) return

        const mutateLike = isLikedByCurrentUser ? dislike : like

        mutateLike({
            variables: {
                aquascapeId: aquascape.id,
                entity: LikeEntityType.Aquascape,
                entityId: aquascape.id,
            },
        })
    }

    const toggleFollow = (userId: number) => {
        const isFollowed = user && isFollowedByCurrentUser(user, userId)
        const mutateFollow = isFollowed ? unfollow : follow

        mutateFollow({variables: {userId}})
    }

    const onShare = () => {
        if (!process.browser) return
        shareOnFacebook(window.location.href)
    }

    const redirectToEdit = () => {
        if (!aquascape) return null

        router.push(
            createDynamicPath(routes.aquascapeDetailsEdit, {
                id: aquascape.id.toString(),
                title: getAquascapeDetailsSlug(
                    aquascape.title || config.AQUASCAPE_URL_TITLE_PLACEHOLDER
                ),
            })
        )
    }

    const isCurrentUserAquascapeOwner =
        aquascape.user && user ? aquascape.user.id === user.id : false

    return (
        <HeroSection
            currentUser={user}
            isLikedByCurrentUser={isLikedByCurrentUser}
            isCurrentUserAquascapeOwner={isCurrentUserAquascapeOwner}
            onShare={onShare}
            onEdit={redirectToEdit}
            aquascape={aquascape}
            isFollowedByCurrentUser={isFollowed}
            toggleFollow={authGuard(toggleFollow)}
            toggleLike={authGuard(toggleLike)}
        />
    )
}

export default HeroSectionContainer
