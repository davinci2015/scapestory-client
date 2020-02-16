import React from 'react'
import classnames from 'classnames'
import * as timeago from 'timeago.js'

import {spaces, colors, typography} from 'styles'
import UserImage, {UserImageSize} from 'components/atoms/UserImage'
import Icon from 'components/atoms/Icon'

interface Props {
    image?: string
    createdAt: number
    icon: string
    active?: boolean
}

const Notification: React.FunctionComponent<Props> = ({
    active,
    children,
    createdAt,
    icon,
    image,
}) => (
    <>
        <div
            className={classnames('notification', {
                'notification--active': active,
            })}
        >
            <div className="creator-image">
                <UserImage image={image} size={UserImageSize.s42} />
            </div>
            <div>
                <div className="content">{children}</div>
                <div className="bottom">
                    <Icon d={icon} size={18} color={colors.SHADE_DEEP} />
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

            .notification .content :global(strong) {
                color: ${colors.BLACK};
                font-weight: ${typography.fontWeight.semibold};
            }

            .notification .bottom {
                display: flex;
                margin-top: ${spaces.s6};
            }

            .notification .bottom .date {
                color: ${colors.SHADE_DEEP};
                font-size: ${typography.fontSize.fs14};
                margin-left: ${spaces.s6};
            }
        `}</style>
    </>
)

export default Notification
