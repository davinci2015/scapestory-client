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

    const isFollowedByMe = useMemo(() => {
        if (user) {
            return user.follows.following.rows.some(
                user => user.followedUserId === aquascape.user?.id
            )
        }
    }, [user, aquascape])

    const [like] = useMutation<LikeMutation, LikeMutationVariables>(LIKE, {
        update: updateAquascapeDetailsCache(AquascapeDetailsActions.AQUASCAPE_LIKE, {
            aquascapeId: aquascape.id,
            isLiked: true,
        }),
    })

    const [dislike] = useMutation<DislikeMutation, DislikeMutationVariables>(DISLIKE, {
        update: updateAquascapeDetailsCache(AquascapeDetailsActions.AQUASCAPE_LIKE, {
            aquascapeId: aquascape.id,
            isLiked: false,
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

        const mutateLike = aquascape.isLikedByMe ? dislike : like
        mutateLike({
            variables: {
                aquascapeId: aquascape.id,
                entity: LikeEntityType.Aquascape,
                entityId: aquascape.id,
            },
        })
    }

    const toggleFollow = () => {
        if (!aquascape || !aquascape.user) {
            return
        }

        if (!isAuthenticated) {
            return openModal('register')
        }

        const mutateFollow = isFollowedByMe ? unfollow : follow
        mutateFollow({variables: {userId: aquascape.user.id}})
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

    const mineAquascape = aquascape.user && user ? aquascape.user.id === user.id : false

    return (
        <HeroSection
            isFollowedByMe={isFollowedByMe}
            onShare={onShare}
            onEdit={redirectToEdit}
            mineAquascape={mineAquascape}
            aquascape={aquascape}
            toggleFollow={toggleFollow}
            toggleLike={toggleLike}
        />
    )
}

export default HeroSectionContainer
