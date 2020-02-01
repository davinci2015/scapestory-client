import React, {useContext} from 'react'

import {Grid, Content} from 'components/core'
import FixedButton from 'components/sections/Home/FixedButton'
import useCreateAquascape from 'hooks/useCreateAquascape'
import {AuthContext} from 'providers/AuthenticationProvider'
import RecentContainer from './RecentContainer'
import TrendingContainer from './TrendingContainer'
import FeaturedContainer from './FeaturedContainer'
import ExploreContainer from './ExploreContainer'

const HomeContainer = () => {
    const onCreateAquascape = useCreateAquascape()
    const {user} = useContext(AuthContext)

    const shouldDisplayButton = !user || !user.aquascapes.count

    return (
        <Content>
            <Grid>
                <FeaturedContainer />
                <TrendingContainer />
                <RecentContainer />
                <ExploreContainer />
                {shouldDisplayButton && <FixedButton onCreateAquascape={onCreateAquascape} />}
            </Grid>
        </Content>
    )
}

export default HomeContainer
