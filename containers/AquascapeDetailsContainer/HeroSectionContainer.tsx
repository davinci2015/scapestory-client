import React, {useContext, useMemo} from 'react'
import {useRouter} from 'next/router'
import {useMutation} from 'react-apollo'

import {LikeEntityType} from 'graphql/generated/types'
import {LIKE, DISLIKE, FOLLOW, UNFOLLOW} from 'graphql/mutations'
import {ModalContext} from 'providers/ModalProvider'
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

interface Props {
    aquascape: AquascapeDetailsQuery['aquascape']
}

const HeroSectionContainer: React.FunctionComponent<Props> = ({aquascape}) => {
    const router = useRouter()
    const {isAuthenticated, user} = useContext(AuthContext)
    const {openModal} = useContext(ModalContext)

    if (!aquascape) return null

    const isLikedByMe = useMemo(
        () => aquascape.likes.rows.some(like => like.user.id === user?.id),
        [aquascape, user]
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
        if (!aquascape) {
            return
        }

        if (!isAuthenticated) {
            return openModal('register')
        }

        const mutateLike = isLikedByMe ? dislike : like
        mutateLike({
            variables: {
                aquascapeId: aquascape.id,
                entity: LikeEntityType.Aquascape,
                entityId: aquascape.id,
            },
        })
    }

    const toggleFollow = (userId: number) => {
        if (!isAuthenticated || !user) {
            return openModal('register')
        }

        const isFollowedByMe = user.follows.following.rows.some(
            user => user.followedUserId === userId
        )

        const mutateFollow = isFollowedByMe ? unfollow : follow
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

    return (
        <HeroSection
            currentUser={user}
            isLikedByMe={isLikedByMe}
            onShare={onShare}
            onEdit={redirectToEdit}
            aquascape={aquascape}
            toggleFollow={toggleFollow}
            toggleLike={toggleLike}
        />
    )
}

export default HeroSectionContainer
