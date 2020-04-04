import React, {useContext, useState, useMemo} from 'react'

import {UserBySlugQuery} from 'graphql/generated/queries'
import {UserImage, FormattedMessage, Paragraph, Headline} from 'components/atoms'
import {UserImageSize, UserImageVariant} from 'components/atoms/UserImage/UserImage'
import UserSection from 'components/sections/Profile/UserSection'
import UserStats from 'components/sections/Profile/UserStats'
import UserAbout from 'components/sections/Profile/UserAbout'
import SocialLink, {SocialNetwork} from 'components/sections/Profile/UserAbout/SocialLink'
import {breakpoints} from 'styles'
import {Hide} from 'components/core'
import {pxToNumber} from 'utils/converter'
import useModal from 'hooks/useModal'
import {UserListModal} from 'components/molecules'
import {AuthContext} from 'providers/AuthenticationProvider'
import {useMutation} from 'react-apollo'
import {
    FollowUserMutationVariables,
    UnfollowUserMutation,
    FollowUserMutation,
    UnfollowUserMutationVariables,
} from 'graphql/generated/mutations'
import {FOLLOW, UNFOLLOW} from 'graphql/mutations'
import {ProfileActions, updateProfileCache} from './cache'
import {isFollowedByCurrentUser} from 'utils/user'
import useAuthGuard from 'hooks/useAuthGuard'
import {getImageCharPlaceholder} from 'utils/user'

interface Props {
    user: UserBySlugQuery['user']
}

enum ModalContent {
    FOLLOWERS,
    FOLLOWING,
}

const UserSectionContainer: React.FunctionComponent<Props> = ({user}) => {
    const {close, isOpen, open} = useModal()
    const [modalContent, setModalContent] = useState(ModalContent.FOLLOWERS)
    const {user: currentUser} = useContext(AuthContext)
    const authGuard = useAuthGuard()

    const openModal = (modal: ModalContent) => () => {
        setModalContent(modal)
        open()
    }

    if (!user) return null

    const followers = useMemo(() => user.follows.followers.rows.map(follow => follow.follower), [
        user,
    ])

    const following = useMemo(() => user.follows.following.rows.map(follow => follow.followed), [
        user,
    ])

    const [follow] = useMutation<FollowUserMutation, FollowUserMutationVariables>(FOLLOW, {
        update: updateProfileCache(ProfileActions.FOLLOW, {slug: user.slug}),
    })

    const [unfollow] = useMutation<UnfollowUserMutation, UnfollowUserMutationVariables>(UNFOLLOW, {
        update: updateProfileCache(ProfileActions.UNFOLLOW, {slug: user.slug}),
    })

    const toggleFollow = (userId: number) => {
        const mutateFollow =
            currentUser && isFollowedByCurrentUser(currentUser, userId) ? unfollow : follow
        mutateFollow({variables: {userId}})
    }

    const authGuardedToggleFollow = authGuard(toggleFollow)

    return (
        <>
            <UserSection
                username={
                    <Headline as="h1" variant="h4">
                        {user.name}
                    </Headline>
                }
                userImage={
                    <>
                        <Hide upTo={pxToNumber(breakpoints.medium)}>
                            <UserImage
                                image={user.profileImage}
                                size={UserImageSize.s148}
                                variant={UserImageVariant.BORDER}
                                placeholder={getImageCharPlaceholder(user.name)}
                            />
                        </Hide>
                        <Hide after={pxToNumber(breakpoints.medium)}>
                            <UserImage
                                image={user.profileImage}
                                size={UserImageSize.s90}
                                variant={UserImageVariant.BORDER}
                                placeholder={getImageCharPlaceholder(user.name)}
                            />
                        </Hide>
                    </>
                }
                stats={
                    <UserStats>
                        <UserStats.Item
                            onClick={
                                followers.length ? openModal(ModalContent.FOLLOWERS) : undefined
                            }
                            title={
                                <FormattedMessage
                                    id="user_profile.followers"
                                    defaultMessage="Followers"
                                />
                            }
                            value={user.follows.followers.count}
                        />
                        <UserStats.Item
                            onClick={
                                following.length ? openModal(ModalContent.FOLLOWING) : undefined
                            }
                            title={
                                <FormattedMessage
                                    id="user_profile.followers"
                                    defaultMessage="Following"
                                />
                            }
                            value={user.follows.following.count}
                        />
                        <UserStats.Item
                            title={
                                <FormattedMessage
                                    id="user_profile.no_aquariums"
                                    defaultMessage="Aquariums"
                                />
                            }
                            value={user.aquascapes.count}
                        />
                    </UserStats>
                }
                about={
                    <UserAbout
                        about={<Paragraph>{user.about}</Paragraph>}
                        socialNetworkArea={
                            <div>
                                {user.facebookUrl && (
                                    <SocialLink
                                        network={SocialNetwork.FACEBOOK}
                                        url={user.facebookUrl}
                                    />
                                )}
                                {user.youtubeUrl && (
                                    <SocialLink
                                        network={SocialNetwork.YOUTUBE}
                                        url={user.youtubeUrl}
                                    />
                                )}
                                {user.instagramUrl && (
                                    <SocialLink
                                        network={SocialNetwork.INSTAGRAM}
                                        url={user.instagramUrl}
                                    />
                                )}
                                {user.twitterUrl && (
                                    <SocialLink
                                        network={SocialNetwork.TWITTER}
                                        url={user.twitterUrl}
                                    />
                                )}
                            </div>
                        }
                        shouldDisplayPlaceholder={
                            !(
                                user.about ||
                                user.facebookUrl ||
                                user.instagramUrl ||
                                user.twitterUrl ||
                                user.youtubeUrl
                            )
                        }
                    />
                }
            />

            <UserListModal
                isOpen={isOpen}
                currentUser={currentUser}
                users={modalContent === ModalContent.FOLLOWERS ? followers : following}
                onClose={close}
                toggleFollow={authGuardedToggleFollow}
                title={
                    <Headline variant="h4">
                        {modalContent === ModalContent.FOLLOWERS ? (
                            <FormattedMessage
                                id="user.user_list.followers"
                                defaultMessage="Followers"
                            />
                        ) : (
                            <FormattedMessage
                                id="user.user_list.following"
                                defaultMessage="Following"
                            />
                        )}
                    </Headline>
                }
            />
        </>
    )
}

export default UserSectionContainer
