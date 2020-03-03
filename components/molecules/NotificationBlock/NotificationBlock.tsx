import React from 'react'

import {spaces, colors, borderRadius} from 'styles'
import {Paragraph} from 'components/atoms'
import Notification from 'components/atoms/Notification'

interface Props {
    title: React.ReactNode
}

const NotificationBlock: React.FunctionComponent<Props> = ({children, title}) => (
    <>
        <Paragraph type="s1" weight="bold">
            {title}
        </Paragraph>
        <div className="notification-block">
            <div>{children}</div>
        </div>
        <style jsx>{`
            .notification-block {
                margin-top: ${spaces.s18};
                margin-bottom: ${spaces.s30};

                border: 2px solid ${colors.SHADE_EXTRA_LIGHT};
                border-radius: ${borderRadius.TERTIARY};
            }

            .notification-block :global(.${Notification.classes.root}):not(:last-of-type) {
                border-bottom: 1px solid ${colors.SHADE_EXTRA_LIGHT};
            }
        `}</style>
    </>
)

export default NotificationBlock
