import React from 'react'
import {storiesOf} from '@storybook/react'

import Comment from './Comment'
import mock from 'mocks/storybook'

storiesOf('Molecules | Comment', module).add('default', () => (
    <Comment
        isLiked={true}
        onLike={() => null}
        comment={{
            id: 1,
            createdAt: Date.now().toLocaleString(),
            content:
                'If I could give you all the applause I would for your perfect rebuttal to a tedious trend',
            user: {
                id: 1,
                name: mock.name,
                slug: '/random',
            },
            likes: [
                {
                    id: 1,
                    userId: 1,
                },
            ],
        }}
    />
))
