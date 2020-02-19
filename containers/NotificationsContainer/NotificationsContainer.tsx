import React from 'react'
import {useQuery} from 'react-apollo'
import Truncate from 'react-truncate'
import {isToday, isYesterday} from 'date-fns'

import NotificationBlock from 'components/molecules/NotificationBlock'
import Notification from 'components/atoms/Notification'
import {Content, Grid} from 'components/core'
import {Icon, FormattedMessage} from 'components/atoms'
import {GridWidth} from 'components/core/Grid'
import {colors} from 'styles'
import {NOTIFICATIONS} from './queries'
import {NotificationStatus, NotificationType} from 'graphql/generated/types'
import {NotificationsQuery} from 'graphql/generated/queries'
import {renderFormattedMessageLink} from 'utils/render'
import UserFollowIcon from 'assets/icons/user-plus.svg'
import routes, {createDynamicPath} from 'routes'
import config from 'config'

const notificationIconMapping = {
    [NotificationType.Like]: <Icon d={Icon.HEART_OUTLINE} color={colors.SHADE_DEEP} />,
    [NotificationType.Comment]: <Icon d={Icon.COMMENT} color={colors.SHADE_DEEP} />,
    [NotificationType.Reply]: <Icon d={Icon.COMMENT} color={colors.SHADE_DEEP} />,
    [NotificationType.Follow]: <UserFollowIcon />,
}

const titleMapping = [
    () => <FormattedMessage id="notification.title.today" defaultMessage="Today" />,
    () => <FormattedMessage id="notification.title.yesterday" defaultMessage="Yesterday" />,
    () => <FormattedMessage id="notification.title.other" defaultMessage="Other" />,
]

const renderCreatorLink = (name?: string, slug?: string) => {
    if (!slug) return routes.index

    return renderFormattedMessageLink(createDynamicPath(routes.profile, {slug}))(
        name || 'Unknown user'
    )
}

const renderAquascapeLink = (id?: number, title?: string | null) => {
    if (!id) return routes.index

    return renderFormattedMessageLink(
        createDynamicPath(routes.aquascapeDetails, {
            id: id.toString(),
            title: title || config.AQUASCAPE_URL_TITLE_PLACEHOLDER,
        })
    )(title || config.AQUASCAPE_TITLE_PLACEHOLDER)
}

const NotificationsContainer = () => {
    const {data, error} = useQuery<NotificationsQuery>(NOTIFICATIONS, {
        fetchPolicy: 'cache-and-network',
    })

    if (!data || error) return null

    return (
        <Content>
            <Grid width={GridWidth.SMALL}>
                {data.notifications
                    .reduce(
                        (acc, item) => {
                            if (isToday(Number(item.createdAt))) acc[0].push(item)
                            else if (isYesterday(Number(item.createdAt))) acc[1].push(item)
                            else acc[2].push(item)

                            return acc
                        },
                        [[], [], []] as [
                            NotificationsQuery['notifications'],
                            NotificationsQuery['notifications'],
                            NotificationsQuery['notifications']
                        ]
                    )
                    .map(
                        (notifications, index: number) =>
                            Boolean(notifications.length) && (
                                <NotificationBlock key={index} title={titleMapping[index]()}>
                                    {notifications.map(item => (
                                        <Notification
                                            key={item.id}
                                            active={item.status === NotificationStatus.Unread}
                                            creator={item.notification.creator}
                                            createdAt={Number(item.createdAt)}
                                            icon={notificationIconMapping[item.notification.type]}
                                        >
                                            {item.notification.type === NotificationType.Like &&
                                                item.notification.like?.aquascape && (
                                                    <FormattedMessage
                                                        id="notification.like.aquascape"
                                                        defaultMessage="{creator} liked your {aquascape}"
                                                        values={{
                                                            creator: renderCreatorLink(
                                                                item.notification.creator?.name,
                                                                item.notification.creator?.slug
                                                            ),
                                                            aquascape: renderAquascapeLink(
                                                                item.notification.like?.aquascape
                                                                    ?.id,
                                                                item.notification.like?.aquascape
                                                                    ?.title
                                                            ),
                                                        }}
                                                    />
                                                )}

                                            {item.notification.type === NotificationType.Like &&
                                                item.notification.like?.comment && (
                                                    <FormattedMessage
                                                        id="notification.like.comment"
                                                        defaultMessage="{creator} liked your comment in {aquascape}"
                                                        values={{
                                                            creator: renderCreatorLink(
                                                                item.notification.creator?.name,
                                                                item.notification.creator?.slug
                                                            ),
                                                            aquascape: renderAquascapeLink(
                                                                item.notification.like?.aquascape
                                                                    ?.id,
                                                                item.notification.like?.aquascape
                                                                    ?.title
                                                            ),
                                                        }}
                                                    />
                                                )}

                                            {item.notification.type === NotificationType.Follow && (
                                                <FormattedMessage
                                                    id="notification.follow"
                                                    defaultMessage="{creator} started following you!"
                                                    values={{
                                                        creator: renderCreatorLink(
                                                            item.notification.creator?.name,
                                                            item.notification.creator?.slug
                                                        ),
                                                    }}
                                                />
                                            )}

                                            {item.notification.type ===
                                                NotificationType.Comment && (
                                                <>
                                                    <FormattedMessage
                                                        id="notification.comment"
                                                        defaultMessage="{creator} commented on your {aquascape}"
                                                        values={{
                                                            creator: renderCreatorLink(
                                                                item.notification.creator?.name,
                                                                item.notification.creator?.slug
                                                            ),
                                                            aquascape: renderAquascapeLink(
                                                                item.notification.like?.aquascape
                                                                    ?.id,
                                                                item.notification.like?.aquascape
                                                                    ?.title
                                                            ),
                                                        }}
                                                    />
                                                    <br />
                                                    <Truncate lines={1} trimWhitespace>
                                                        {item.notification.comment?.content}
                                                    </Truncate>
                                                </>
                                            )}
                                        </Notification>
                                    ))}
                                </NotificationBlock>
                            )
                    )}
            </Grid>
        </Content>
    )
}

export default NotificationsContainer
