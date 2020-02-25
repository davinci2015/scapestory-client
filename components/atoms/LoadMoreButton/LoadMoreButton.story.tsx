import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import LoadMoreButton from './LoadMoreButton'

storiesOf('Atoms | LoadMoreButton', module).add('default', () => (
    <LoadMoreButton text="Load more something" onClick={action('onClick')} />
))
