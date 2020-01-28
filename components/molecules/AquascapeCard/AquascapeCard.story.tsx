import React from 'react'
import {storiesOf} from '@storybook/react'

import AquascapeCard from './AquascapeCard'

storiesOf('Molecules | AquascapeCard', module).add('default', () => (
    <div style={{maxWidth: 420}}>
        <AquascapeCard
            id={1}
            viewsCount={100}
            likesCount={200}
            tags={[{name: 'Diorama'}]}
            title="My awesome aquascape"
            image="https://images.homify.com/image/upload/a_0,c_fill,f_auto,h_900,q_auto,w_1920/v1441196948/p/photo/image/745836/360er-aktuell_resize2.jpg"
        />
    </div>
))
