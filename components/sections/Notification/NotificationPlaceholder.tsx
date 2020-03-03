import React from 'react'

import {colors} from 'styles'
import {FormattedMessage, Icon, Paragraph} from 'components/atoms'

interface Props {}

const NotificationPlaceholder: React.FunctionComponent<Props> = () => (
    <>
        <div className="section">
            <Icon d={Icon.BELL} color={colors.SHADE_LIGHT} size={80} viewBox="0 0 40 40" />
            <Paragraph weight="semibold">
                <FormattedMessage
                    id="notification_placeholder"
                    defaultMessage="You don't have any new notifications"
                />
            </Paragraph>
        </div>
        <style jsx>{`
            .section {
                text-align: center;
            }
        `}</style>
    </>
)

export default NotificationPlaceholder
