import React from 'react'
import {storiesOf} from '@storybook/react'

import Notification from './Notification'
import mock from 'mocks/storybook'
import Icon from '../Icon'

storiesOf('Atoms | Notification', module).add('default', () => (
    <Notification image={mock.userImage} createdAt={1473245023718} icon={Icon.HEART_OUTLINE}>
        <strong>Mark Ronson</strong> commented on your photo in <strong>Beautiful Dream.</strong>
    </Notification>
))
