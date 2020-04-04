import React, {useContext, useState, useMemo, useCallback} from 'react'

import {UserBySlugQuery, User_ProfileQuery} from 'graphql/generated/queries'
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
import {getImageCharPlaceholder} from 'utils/user'
import {ModalContext} from 'providers/ModalProvider'

interface Props {
    currentUser?: User_ProfileQuery['me']
    user: UserBySlugQuery['user']
    toggleFollow: (useId: number) => void
}

enum ModalContent {
    FOLLOWERS,
    FOLLOWING,
}

const UserSectionContainer: React.FunctionComponent<Props> = ({
    currentUser,
    toggleFollow,
    user,
}) => {
    const {close: closeFollowModal, isOpen, open} = useModal()
    const [modalContent, setModalContent] = useState(ModalContent.FOLLOWERS)
    const {openModal} = useContext(ModalContext)

    const openFollowModal = (modal: ModalContent) => () => {
        setModalContent(modal)
        open()
    }

    const openRegisterModal = useCallback(() => {
        openModal('register')
        closeFollowModal()
    }, [])

    if (!user) return null

    const followers = useMemo(() => user.follows.followers.rows.map(follow => follow.follower), [
        user,
    ])

    const following = useMemo(() => user.follows.following.rows.map(follow => follow.followed), [
        user,
    ])

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
                                followers.length
                                    ? openFollowModal(ModalContent.FOLLOWERS)
                                    : undefined
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
                                following.length
                                    ? openFollowModal(ModalContent.FOLLOWING)
                                    : undefined
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
                openRegisterModal={openRegisterModal}
                isOpen={isOpen}
                currentUser={currentUser}
                users={modalContent === ModalContent.FOLLOWERS ? followers : following}
                onClose={closeFollowModal}
                toggleFollow={toggleFollow}
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
