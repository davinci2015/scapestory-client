import React from 'react'
import classnames from 'classnames'
import {format} from 'timeago.js'

import {spaces, colors, typography} from 'styles'
import UserImage, {UserImageSize} from 'components/atoms/UserImage'
import {User} from 'graphql/generated/types'
import Link from 'next/link'
import {getImageCharPlaceholder} from 'utils/user'

const classes = {
    root: 'notification',
}

type CreatorType = Pick<User, 'id' | 'slug' | 'name' | 'profileImage'> | null

interface Props {
    createdAt: number
    creator?: CreatorType
    icon: React.ReactNode
    active?: boolean
    imageHref?: string
}

type NotificationType = React.FunctionComponent<Props> & {
    classes: typeof classes
}

const CreatorImage = ({creator}: {creator?: CreatorType}) => (
    <UserImage
        image={creator?.profileImage}
        placeholder={getImageCharPlaceholder(creator?.name)}
        size={UserImageSize.s42}
    />
)

const Notification: NotificationType = ({
    active,
    children,
    createdAt,
    creator,
    icon,
    imageHref,
}) => (
    <>
        <div
            className={classnames('notification', {
                'notification--active': active,
            })}
        >
            {imageHref ? (
                <Link href={imageHref}>
                    <a className="creator-image">
                        <CreatorImage creator={creator} />
                    </a>
                </Link>
            ) : (
                <CreatorImage creator={creator} />
            )}
            <div>
                <div className="content">{children}</div>
                <div className="bottom">
                    {icon}
                    <span className="date">{format(createdAt)}</span>
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

            .notification .creator-image {
                text-decoration: none;
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
