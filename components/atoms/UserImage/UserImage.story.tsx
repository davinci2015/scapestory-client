import React from 'react'
import {storiesOf} from '@storybook/react'

import UserImage, {UserImageSize, UserImageVariant} from './UserImage'
import mock from 'mocks/storybook'

storiesOf('Atoms | UserImage', module)
    .add('default', () => <UserImage image={mock.userImage} />)
    .add('size large', () => <UserImage image={mock.userImage} size={UserImageSize.s148} />)
    .add('with placeholder', () => <UserImage size={UserImageSize.s36} placeholder="D" />)
    .add('with border', () => (
        <UserImage
            image={mock.userImage}
            size={UserImageSize.s148}
            variant={UserImageVariant.BORDER}
        />
    ))
