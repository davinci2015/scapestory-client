import React from 'react'
import {storiesOf} from '@storybook/react'

import NotificationBlock from './NotificationBlock'
import {storyNotification} from 'components/atoms/Notification/Notification.story'

storiesOf('Molecules | NotificationBlock', module).add('default', () => (
    <NotificationBlock title="Today">
        {storyNotification()}
        {storyNotification()}
        {storyNotification()}
    </NotificationBlock>
))
