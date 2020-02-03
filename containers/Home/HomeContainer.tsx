import React from 'react'

import {Grid, Content} from 'components/core'
import RecentContainer from './RecentContainer'
import TrendingContainer from './TrendingContainer'
import FeaturedContainer from './FeaturedContainer'
import ExploreContainer from './ExploreContainer'
import AddAquascapeContainer from './AddAquascapeContainer'

const HomeContainer = () => (
    <>
        <Content>
            <Grid>
                <FeaturedContainer />
                <TrendingContainer />
                <RecentContainer />
                <ExploreContainer />
            </Grid>
        </Content>
        <AddAquascapeContainer />
    </>
)

export default HomeContainer
