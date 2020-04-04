import React from 'react'
import Modal from 'components/molecules/Modal'
import {spaces, colors, media} from 'styles'
import {User, User_ProfileQuery} from 'graphql/generated/queries'
import {UserImage, Paragraph, FormattedMessage} from 'components/atoms'
import {UserImageSize} from 'components/atoms/UserImage'
import {formatDate, dateFormats} from 'utils/date'
import {isFollowedByCurrentUser, getImageCharPlaceholder} from 'utils/user'
import {useRouter} from 'next/router'
import routes, {createDynamicPath} from 'routes'

interface Props {
    currentUser?: User_ProfileQuery['me']
    title: React.ReactNode
    isOpen: boolean
    onClose: VoidFunction
    openRegisterModal: VoidFunction
    toggleFollow: (userId: number) => void
    users: Pick<User, 'id' | 'name' | 'profileImage' | 'createdAt' | 'slug'>[]
}

const UserListModal: React.FunctionComponent<Props> = ({
    currentUser,
    isOpen,
    onClose,
    openRegisterModal,
    title,
    toggleFollow,
    users,
}) => {
    const router = useRouter()

    const redirectToProfile = (slug: string) => () => {
        onClose()
        router.push(createDynamicPath(routes.profile, {slug}))
    }

    return (
        <>
            <Modal isOpen={isOpen} shouldCloseOnEsc>
                <Modal.Content isOpen={isOpen}>
                    <div className="user-modal">
                        <Modal.CloseButton onClick={onClose} />
                        <div className="user-modal__title">{title}</div>
                        <ul className="list">
                            {users.map(user => (
                                <li className="list-item" key={user.id}>
                                    <div className="user-info">
                                        <a
                                            className="profile-link"
                                            onClick={redirectToProfile(user.slug)}
                                        >
                                            <UserImage
                                                size={UserImageSize.s42}
                                                image={user.profileImage}
                                                placeholder={getImageCharPlaceholder(user.name)}
                                            />
                                        </a>
                                        <div>
                                            <a
                                                className="profile-link user-name"
                                                onClick={redirectToProfile(user.slug)}
                                            >
                                                <Paragraph weight="bold">{user.name}</Paragraph>
                                            </a>
                                            <Paragraph type="s2" color={colors.DARK_GRAY}>
                                                Member since{' '}
                                                {formatDate(
                                                    parseInt(user.createdAt),
                                                    dateFormats.SECONDARY
                                                )}
                                            </Paragraph>
                                        </div>
                                    </div>

                                    {currentUser &&
                                        currentUser.id !== user.id &&
                                        isFollowedByCurrentUser(currentUser, user.id) && (
                                            <a
                                                className="follow"
                                                onClick={() => toggleFollow(user.id)}
                                            >
                                                <FormattedMessage
                                                    id="user_list.unfollow"
                                                    defaultMessage="Unfollow"
                                                />
                                            </a>
                                        )}

                                    {currentUser &&
                                        currentUser.id !== user.id &&
                                        !isFollowedByCurrentUser(currentUser, user.id) && (
                                            <a
                                                className="follow"
                                                onClick={() => toggleFollow(user.id)}
                                            >
                                                <FormattedMessage
                                                    id="user_list.follow"
                                                    defaultMessage="Follow"
                                                />
                                            </a>
                                        )}

                                    {!currentUser && (
                                        <a className="follow" onClick={openRegisterModal}>
                                            <FormattedMessage
                                                id="user_list.follow"
                                                defaultMessage="Follow"
                                            />
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Modal.Content>
            </Modal>
            <style jsx>{`
                .user-modal {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: ${spaces.s16} ${spaces.s24};
                    width: 100vw;
                }

                @media ${media.up('small')} {
                    .user-modal {
                        width: 480px;
                        padding: ${spaces.s16} ${spaces.s36};
                    }
                }

                @media ${media.up('medium')} {
                    .user-modal {
                        width: 600px;
                        padding: ${spaces.s16} ${spaces.s36};
                    }
                }

                .user-modal__title {
                    margin: ${spaces.s16};
                    margin-left: 0;
                }

                .list {
                    padding: 0;
                    list-style: none;
                }

                .list-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    padding: ${spaces.s18} 0;
                }

                .list-item:not(:last-of-type) {
                    border-bottom: 2px solid ${colors.SHADE_EXTRA_LIGHT};
                }

                .list-item :global(.${Paragraph.classes.root}) {
                    margin-left: ${spaces.s16};
                }

                .user-info {
                    display: flex;
                    align-items: center;
                }

                .user-name :global(.${Paragraph.classes.root}) {
                    transition: color 100ms ease-in-out;
                }

                .user-name :global(.${Paragraph.classes.root}):hover {
                    color: ${colors.DARK_GRAY};
                }

                .follow {
                    position: relative;
                    cursor: pointer;
                }

                .profile-link {
                    cursor: pointer;
                }

                .follow::after {
                    position: absolute;
                    content: '';
                    bottom: -3px;
                    left: 0;
                    height: 2px;
                    width: 0;
                    background-color: ${colors.PRIMARY};
                    transition: width 200ms ease-in-out;
                }

                .follow:hover::after {
                    width: 100%;
                }
            `}</style>
        </>
    )
}

export default UserListModal
