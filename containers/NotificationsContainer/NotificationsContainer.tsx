import React from 'react'
import {useQuery} from 'react-apollo'
import Truncate from 'react-truncate'

import NotificationBlock from 'components/molecules/NotificationBlock'
import Notification from 'components/atoms/Notification'
import {Content, Grid} from 'components/core'
import {Icon} from 'components/atoms'
import {GridWidth} from 'components/core/Grid'
import {colors} from 'styles'
import UserFollowIcon from 'assets/icons/user-plus.svg'
import {NOTIFICATIONS} from './queries'

const NotificationsContainer = () => {
    const {data, error} = useQuery(NOTIFICATIONS, {
        fetchPolicy: 'cache-and-network',
    })

    if (!data || error) return null

    return (
        <Content>
            <Grid width={GridWidth.SMALL}>
                <NotificationBlock title="Today">
                    <Notification
                        active
                        image=""
                        createdAt={22223242}
                        icon={<Icon d={Icon.HEART_OUTLINE} color={colors.SHADE_DEEP} />}
                    >
                        <strong>XY</strong> liked your <strong>Aquascape</strong>!
                    </Notification>
                    <Notification
                        active
                        image=""
                        createdAt={22223242}
                        icon={<Icon d={Icon.HEART_OUTLINE} color={colors.SHADE_DEEP} />}
                    >
                        <strong>XY</strong> liked your comment!
                    </Notification>
                    <Notification
                        image=""
                        createdAt={22223242}
                        icon={<Icon d={Icon.COMMENT} color={colors.SHADE_DEEP} />}
                    >
                        <strong>XY</strong> commented on your <strong>Aquascape</strong>:
                        <br />
                        <Truncate lines={1} trimWhitespace>
                            If I could give you all the applause I would for your perfect rebuttal
                            to a tedious trend of attention grabbing shallow and uniformed articles
                            by pseudo design talent
                        </Truncate>
                    </Notification>
                    <Notification image="" createdAt={22223242} icon={<UserFollowIcon />}>
                        <strong>XY</strong> started following you!
                    </Notification>
                </NotificationBlock>
                <NotificationBlock title="Yesterday">
                    <Notification
                        image=""
                        createdAt={22223242}
                        icon={<Icon d={Icon.HEART_OUTLINE} color={colors.SHADE_DEEP} />}
                    >
                        <strong>XY</strong> liked your <strong>Aquascape</strong>!
                    </Notification>
                    <Notification
                        image=""
                        createdAt={22223242}
                        icon={<Icon d={Icon.HEART_OUTLINE} color={colors.SHADE_DEEP} />}
                    >
                        <strong>XY</strong> liked your comment!
                    </Notification>
                    <Notification
                        image=""
                        createdAt={22223242}
                        icon={<Icon d={Icon.COMMENT} color={colors.SHADE_DEEP} />}
                    >
                        <strong>XY</strong> commented on your <strong>Aquascape</strong>:
                        <br />
                        <Truncate lines={1} trimWhitespace>
                            If I could give you all the applause I would for your perfect rebuttal
                            to a tedious trend of attention grabbing shallow and uniformed articles
                            by pseudo design talent
                        </Truncate>
                    </Notification>
                    <Notification image="" createdAt={22223242} icon={<UserFollowIcon />}>
                        <strong>XY</strong> started following you!
                    </Notification>
                </NotificationBlock>
                <NotificationBlock title="Older">
                    <Notification
                        image=""
                        createdAt={22223242}
                        icon={<Icon d={Icon.HEART_OUTLINE} color={colors.SHADE_DEEP} />}
                    >
                        <strong>XY</strong> liked your <strong>Aquascape</strong>!
                    </Notification>
                    <Notification
                        image=""
                        createdAt={22223242}
                        icon={<Icon d={Icon.HEART_OUTLINE} color={colors.SHADE_DEEP} />}
                    >
                        <strong>XY</strong> liked your comment!
                    </Notification>
                </NotificationBlock>
            </Grid>
        </Content>
    )
}

export default NotificationsContainer
