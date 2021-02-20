import React from 'react'
import {storiesOf} from '@storybook/react'

import {SelectCreatable, SelectDefault} from './Select'

storiesOf('Atoms | SelectCreatable', module).add('default', () => (
    <SelectCreatable
        onChange={option => option}
        options={[
            {value: 'random', label: 'random'},
            {value: 'second', label: 'second'},
        ]}
    />
))

storiesOf('Atoms | Select', module).add('default', () => (
    <SelectDefault
        onChange={option => option}
        options={[
            {value: 'random', label: 'random'},
            {value: 'second', label: 'second'},
        ]}
    />
))
