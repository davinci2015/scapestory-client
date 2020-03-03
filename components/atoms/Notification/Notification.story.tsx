import React from 'react'
import {storiesOf} from '@storybook/react'

import Notification from './Notification'
import Icon from '../Icon'

export const storyNotification = () => (
    <Notification createdAt={1473245023718} icon={Icon.HEART_OUTLINE}>
        <strong>Mark Ronson</strong> commented on your photo in <strong>Beautiful Dream.</strong>
    </Notification>
)

storiesOf('Atoms | Notification', module).add('default', () => storyNotification())
