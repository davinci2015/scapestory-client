import React, {useContext, useMemo, useCallback} from 'react'
import {useApolloClient} from 'react-apollo'

import {UserBySlugQuery, User_ProfileQuery} from 'graphql/generated/queries'
import {AuthContext} from 'providers/AuthenticationProvider'
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
import {isFollowedByCurrentUser} from 'utils/user'
import logger from 'services/logger'

interface Props {
    user: UserBySlugQuery['user']
    currentUser?: User_ProfileQuery['me']
    onEdit: VoidFunction
    toggleFollow: (userId: number) => void
}

const CoverSectionContainer: React.FunctionComponent<Props> = ({
    currentUser,
    onEdit,
    toggleFollow,
    user,
}) => {
    const {refreshAuthentication} = useContext(AuthContext)
    const onCreateAquascape = useCreateAquascape()
    const router = useRouter()
    const apolloClient = useApolloClient()

    const onFollow = useCallback(() => {
        user && toggleFollow(user.id)
    }, [user])

    if (!user) return null

    const isFollowed = useMemo(() => currentUser && isFollowedByCurrentUser(currentUser, user.id), [
        currentUser,
        user,
    ])

    const onLogout = () => {
        cookie.removeAuthToken()
        apolloClient
            .resetStore()
            .then(() => {
                refreshAuthentication()
                router.push(routes.index)
            })
            .catch(logger.error)
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
                            <UnfollowButton toggleFollow={onFollow} />
                        ) : (
                            <FollowButton toggleFollow={onFollow} />
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
