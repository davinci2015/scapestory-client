import React, {useEffect, useContext} from 'react'
import {useQuery, useMutation, useApolloClient} from 'react-apollo'
import Truncate from 'react-truncate'
import {isToday, isYesterday} from 'date-fns'

import {UNREAD_NOTIFICATIONS_COUNT} from 'containers/NavigationContainer/queries'
import {AuthContext} from 'providers/AuthenticationProvider'
import NotificationBlock from 'components/molecules/NotificationBlock'
import Notification from 'components/atoms/Notification'
import {Content, Grid} from 'components/core'
import {Icon, FormattedMessage} from 'components/atoms'
import {GridWidth} from 'components/core/Grid'
import {NotificationStatus, NotificationType} from 'graphql/generated/types'
import {NotificationsQuery, NotificationsQueryVariables} from 'graphql/generated/queries'
import {MutationReadNotificationsArgs} from 'graphql/generated/mutations'
import {renderFormattedMessageLink} from 'utils/render'
import UserFollowIcon from 'assets/icons/user-plus.svg'
import routes, {createDynamicPath} from 'routes'
import {colors} from 'styles'
import config from 'config'
import {NOTIFICATIONS} from './queries'
import {READ_NOTIFICATIONS} from './mutations'
import NotificationSection from 'components/sections/Notification'
import NotificationPlaceholder from 'components/sections/Notification/NotificationPlaceholder'

const notificationIconMapping = {
    [NotificationType.Like]: <Icon d={Icon.HEART_OUTLINE} color={colors.SHADE_DEEP} />,
    [NotificationType.Comment]: <Icon d={Icon.COMMENT} color={colors.SHADE_DEEP} />,
    [NotificationType.Reply]: <Icon d={Icon.COMMENT} color={colors.SHADE_DEEP} />,
    [NotificationType.Follow]: <UserFollowIcon />,
}

const titleMapping = [
    () => <FormattedMessage id="notification.title.today" defaultMessage="Today" />,
    () => <FormattedMessage id="notification.title.yesterday" defaultMessage="Yesterday" />,
    () => <FormattedMessage id="notification.title.older" defaultMessage="Older" />,
]

const NOTIFICATIONS_PER_LOAD = 20

const renderCreatorLink = (name?: string, slug?: string) => {
    if (!slug) return 'User'

    return renderFormattedMessageLink(createDynamicPath(routes.profile, {slug}))(
        name || 'Unknown user'
    )
}

const renderAquascapeLink = (id?: number, title?: string | null) => {
    if (!id) return config.AQUASCAPE_TITLE_PLACEHOLDER

    return renderFormattedMessageLink(
        createDynamicPath(routes.aquascapeDetails, {
            id: id.toString(),
            title: title || config.AQUASCAPE_URL_TITLE_PLACEHOLDER,
        })
    )(title || config.AQUASCAPE_TITLE_PLACEHOLDER)
}

const NotificationsContainer = () => {
    const {user} = useContext(AuthContext)
    const apolloClient = useApolloClient()

    const [readNotificationsMutation] = useMutation<undefined, MutationReadNotificationsArgs>(
        READ_NOTIFICATIONS
    )

    const {data, error, fetchMore} = useQuery<NotificationsQuery, NotificationsQueryVariables>(
        NOTIFICATIONS,
        {
            fetchPolicy: 'cache-and-network',
            variables: {pagination: {limit: NOTIFICATIONS_PER_LOAD}},
        }
    )

    useEffect(() => {
        if (user)
            readNotificationsMutation({variables: {notifierId: user.id}}).then(() => {
                apolloClient.writeQuery({
                    query: UNREAD_NOTIFICATIONS_COUNT,
                    data: {unreadNotificationsCount: 0},
                })
            })
    }, [])

    const loadMore = () => {
        fetchMore({
            variables: {
                pagination: {
                    limit: NOTIFICATIONS_PER_LOAD,
                    offset: data?.notifications.rows.length || 0,
                },
            },
            updateQuery: (prev, options) => {
                if (!options.fetchMoreResult) return prev

                return {
                    notifications: {
                        count: options.fetchMoreResult.notifications.count,
                        rows: [
                            ...prev.notifications.rows,
                            ...options.fetchMoreResult.notifications.rows,
                        ],
                        __typename: prev.notifications.__typename,
                    },
                }
            },
        })
    }

    if (!data || error) return null

    const canLoadMore = data.notifications.rows.length < data.notifications.count

    return (
        <Content>
            <Grid width={GridWidth.SMALL}>
                <NotificationSection loadMore={canLoadMore ? loadMore : undefined}>
                    {data.notifications.count === 0 && <NotificationPlaceholder />}
                    {data.notifications.rows
                        .reduce(
                            (acc, item) => {
                                if (isToday(Number(item.createdAt))) acc[0].push(item)
                                else if (isYesterday(Number(item.createdAt))) acc[1].push(item)
                                else acc[2].push(item)

                                return acc
                            },
                            [[], [], []] as [
                                NotificationsQuery['notifications']['rows'],
                                NotificationsQuery['notifications']['rows'],
                                NotificationsQuery['notifications']['rows']
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
                                                imageHref={
                                                    item.notification.creator?.slug &&
                                                    createDynamicPath(routes.profile, {
                                                        slug: item.notification.creator.slug,
                                                    })
                                                }
                                                icon={
                                                    notificationIconMapping[item.notification.type]
                                                }
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
                                                                    item.notification.like
                                                                        ?.aquascape?.id,
                                                                    item.notification.like
                                                                        ?.aquascape?.title
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
                                                                    item.notification.like.comment
                                                                        ?.aquascape?.id,
                                                                    item.notification.like.comment
                                                                        ?.aquascape?.title
                                                                ),
                                                            }}
                                                        />
                                                    )}

                                                {item.notification.type ===
                                                    NotificationType.Follow && (
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
                                                                    item.notification.comment
                                                                        ?.aquascape?.id,
                                                                    item.notification.comment
                                                                        ?.aquascape?.title
                                                                ),
                                                            }}
                                                        />
                                                        <br />
                                                        &quot;
                                                        <Truncate lines={1} trimWhitespace>
                                                            {item.notification.comment?.content}
                                                        </Truncate>
                                                        &quot;
                                                    </>
                                                )}

                                                {item.notification.type ===
                                                    NotificationType.Reply && (
                                                    <>
                                                        <FormattedMessage
                                                            id="notification.reply"
                                                            defaultMessage="{creator} replied to your comment on {aquascape}"
                                                            values={{
                                                                creator: renderCreatorLink(
                                                                    item.notification.creator?.name,
                                                                    item.notification.creator?.slug
                                                                ),
                                                                aquascape: renderAquascapeLink(
                                                                    item.notification.comment
                                                                        ?.aquascape?.id,
                                                                    item.notification.comment
                                                                        ?.aquascape?.title
                                                                ),
                                                            }}
                                                        />
                                                        <br />
                                                        &quot;
                                                        <Truncate lines={1} trimWhitespace>
                                                            {item.notification.comment?.content}
                                                        </Truncate>
                                                        &quot;
                                                    </>
                                                )}
                                            </Notification>
                                        ))}
                                    </NotificationBlock>
                                )
                        )}
                </NotificationSection>
            </Grid>
        </Content>
    )
}

export default NotificationsContainer
