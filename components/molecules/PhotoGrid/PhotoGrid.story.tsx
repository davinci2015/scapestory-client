import React from 'react'
import {storiesOf} from '@storybook/react'
import {PhotoGrid} from 'components/molecules'
import mock from 'mocks/storybook'
import {action} from '@storybook/addon-actions'

storiesOf('Molecules | PhotoGrid', module).add('default', () => (
    <PhotoGrid
        openGallery={action('openGallery')}
        images={[
            {id: 1, src: mock.aquascapeImage, alt: 'Image'},
            {id: 2, src: mock.aquascapeImage, alt: 'Image'},
            {id: 3, src: mock.aquascapeImage, alt: 'Image'},
            {id: 4, src: mock.aquascapeImage, alt: 'Image'},
            {id: 5, src: mock.aquascapeImage, alt: 'Image'},
            {id: 6, src: mock.aquascapeImage, alt: 'Image'},
            {id: 7, src: mock.aquascapeImage, alt: 'Image'},
        ]}
    />
))
