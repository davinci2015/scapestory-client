import React, {useContext, useMemo} from 'react'
import {useMutation} from 'react-apollo'

import {UserBySlugQuery} from 'graphql/generated/queries'
import {updateProfileCache, ProfileActions} from 'containers/ProfileContainer/cache'
import {FOLLOW, UNFOLLOW} from 'graphql/mutations'
import {AuthContext} from 'providers/AuthenticationProvider'
import {ModalContext} from 'providers/ModalProvider'
import CoverSection from 'components/sections/Profile/CoverSection'
import {Button, FormattedMessage, Icon} from 'components/atoms'
import LogoutIcon from 'assets/icons/log-out.svg'
import {colors, breakpoints} from 'styles'
import cookie from 'services/cookie'
import {useRouter} from 'next/router'
import routes from 'routes'
import {UnfollowButton, FollowButton, AddAquascapeButton} from 'components/molecules'
import {Hide} from 'components/core'
import {pxToNumber} from 'utils/converter'
import useCreateAquascape from 'hooks/useCreateAquascape'
import {
    FollowUserMutation,
    FollowUserMutationVariables,
    UnfollowUserMutation,
    UnfollowUserMutationVariables,
} from 'graphql/generated/mutations'
import {isFollowedByCurrentUser} from 'utils/user'

interface Props {
    user: UserBySlugQuery['user']
    onEdit: VoidFunction
}

const CoverSectionContainer: React.FunctionComponent<Props> = ({onEdit, user}) => {
    const {isAuthenticated, refreshAuthentication, user: currentUser} = useContext(AuthContext)
    const {openModal} = useContext(ModalContext)
    const onCreateAquascape = useCreateAquascape()
    const router = useRouter()

    if (!user) return null

    const isFollowed = useMemo(
        () => !!currentUser && isFollowedByCurrentUser(currentUser, user.id),
        [currentUser, user]
    )

    const [follow] = useMutation<FollowUserMutation, FollowUserMutationVariables>(FOLLOW, {
        update: updateProfileCache(ProfileActions.FOLLOW),
    })

    const [unfollow] = useMutation<UnfollowUserMutation, UnfollowUserMutationVariables>(UNFOLLOW, {
        update: updateProfileCache(ProfileActions.UNFOLLOW),
    })

    const onLogout = () => {
        cookie.removeAuthToken()
        refreshAuthentication()
        router.push(routes.index)
    }

    const toggleFollow = () => {
        if (!isAuthenticated || !currentUser) {
            return openModal('register')
        }

        const mutateFollow = isFollowed ? unfollow : follow
        mutateFollow({variables: {userId: user.id}})
    }

    const isProfileFromCurrentUser = currentUser?.id === user.id

    return (
        <CoverSection
            coverImage={user.coverImage}
            actionButtons={
                <>
                    {isProfileFromCurrentUser && (
                        <Hide after={pxToNumber(breakpoints.small)}>
                            <AddAquascapeButton onClick={onCreateAquascape} />
                        </Hide>
                    )}
                    {!isProfileFromCurrentUser &&
                        (isFollowed ? (
                            <UnfollowButton toggleFollow={toggleFollow} />
                        ) : (
                            <FollowButton toggleFollow={toggleFollow} />
                        ))}

                    {isProfileFromCurrentUser && (
                        <>
                            <Button
                                leftIcon={<Icon d={Icon.EDIT} color={colors.WHITE} />}
                                dimensions="extraSmall"
                                color="tertiary"
                                onClick={onEdit}
                            >
                                <FormattedMessage
                                    id="user_profile.edit"
                                    defaultMessage="Edit profile"
                                />
                            </Button>
                            <Button
                                leftIcon={<LogoutIcon />}
                                dimensions="extraSmall"
                                color="tertiary"
                                onClick={onLogout}
                            >
                                <FormattedMessage
                                    id="user_profile.logout"
                                    defaultMessage="Logout"
                                />
                            </Button>
                        </>
                    )}
                </>
            }
        />
    )
}

export default CoverSectionContainer
