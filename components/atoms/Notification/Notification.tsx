import React from 'react'
import classnames from 'classnames'
import * as timeago from 'timeago.js'

import {spaces, colors, typography} from 'styles'
import UserImage, {UserImageSize} from 'components/atoms/UserImage'
import {User} from 'graphql/generated/types'

const classes = {
    root: 'notification',
}

interface Props {
    createdAt: number
    creator?: Pick<User, 'id' | 'slug' | 'name' | 'profileImage'> | null
    icon: React.ReactNode
    active?: boolean
}

type NotificationType = React.FunctionComponent<Props> & {
    classes: typeof classes
}

const Notification: NotificationType = ({active, children, createdAt, creator, icon}) => (
    <>
        <div
            className={classnames('notification', {
                'notification--active': active,
            })}
        >
            <div className="creator-image">
                <UserImage
                    image={creator?.profileImage}
                    placeholder={creator?.name.charAt(0)}
                    size={UserImageSize.s42}
                />
            </div>
            <div>
                <div className="content">{children}</div>
                <div className="bottom">
                    {icon}
                    <span className="date">{timeago.format(createdAt)}</span>
                </div>
            </div>
        </div>
        <style jsx>{`
            .notification {
                display: flex;
                padding: ${spaces.s20} ${spaces.s24};
                background-color: ${colors.WHITE};
            }

            .notification--active {
                background-color: rgba(63, 201, 119, 0.1);
            }

            .notification .content {
                font-weight: ${typography.fontWeight.semibold};
                color: ${colors.SHADE_DEEP};
            }

            .notification :global(.${UserImage.classes.root}) {
                margin-right: ${spaces.s18};
            }

            .notification .content :global(a) {
                color: ${colors.BLACK};
                font-weight: ${typography.fontWeight.semibold};
                text-decoration: none;
            }

            .notification .bottom {
                display: flex;
                align-items: center;
                margin-top: ${spaces.s6};
            }

            .notification .bottom :global(svg) {
                color: ${colors.SHADE_DEEP};
                width: 18px;
                height: 18px;
            }

            .notification .bottom .date {
                color: ${colors.SHADE_DEEP};
                font-size: ${typography.fontSize.fs14};
                margin-left: ${spaces.s6};
            }
        `}</style>
    </>
)

Notification.classes = classes

export default Notification
