import React from 'react'
import Modal from 'components/molecules/Modal'
import {spaces, colors} from 'styles'
import {User} from 'graphql/generated/queries'
import {UserImage, Paragraph} from 'components/atoms'
import {UserImageSize} from 'components/atoms/UserImage'

interface Props {
    title: React.ReactNode
    isOpen: boolean
    onClose: VoidFunction
    users: Pick<User, 'id' | 'name' | 'profileImage'>[]
}

const UserListModal: React.FunctionComponent<Props> = ({isOpen, onClose, title, users}) => (
    <>
        <Modal isOpen={isOpen} shouldCloseOnEsc>
            <Modal.Content isOpen={isOpen}>
                <div className="user-modal">
                    <Modal.CloseButton onClick={onClose} />
                    <div className="user-modal__title">{title}</div>
                    <ul className="list">
                        {users.map(user => (
                            <li className="list-item" key={user.id}>
                                <UserImage
                                    size={UserImageSize.s42}
                                    image={user.profileImage}
                                    placeholder={user.name.charAt(0)}
                                />
                                <Paragraph weight="bold">{user.name}</Paragraph>
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
                padding: ${spaces.s16} ${spaces.s36};
                width: 600px;
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
                padding: ${spaces.s16} 0;
                display: flex;
                align-items: center;
            }

            .list-item:not(:last-of-type) {
                border-bottom: 1px solid ${colors.SHADE_LIGHT};
            }

            .list-item :global(.${Paragraph.classes.root}) {
                margin-left: ${spaces.s16};
            }
        `}</style>
    </>
)

export default UserListModal
