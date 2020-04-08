import React from 'react'
import Skeleton from 'react-loading-skeleton'
import {Content, Grid, Hide} from 'components/core'
import {Section} from 'components/sections/AquascapeDetails'
import {pxToNumber} from 'utils/converter'
import {breakpoints, spaces} from 'styles'

const DetailsPageSkeleton = () => (
    <>
        <Content>
            <Skeleton height="70vh" />
            <Grid>
                <Section>
                    <Grid.Row>
                        <Hide after={pxToNumber(breakpoints.medium)}>
                            {Array(4)
                                .fill('')
                                .map((_, index) => (
                                    <Grid.Item extraSmall={6} key={index}>
                                        <div className="item">
                                            <Skeleton height="120px" />
                                        </div>
                                    </Grid.Item>
                                ))}
                        </Hide>
                        <Hide upTo={pxToNumber(breakpoints.medium)}>
                            {Array(4)
                                .fill('')
                                .map((_, index) => (
                                    <Grid.Item extraSmall={3} key={index}>
                                        <div className="item">
                                            <Skeleton height="200px" />
                                        </div>
                                    </Grid.Item>
                                ))}
                        </Hide>
                    </Grid.Row>
                </Section>
            </Grid>
        </Content>
        <style jsx>{`
            .item {
                margin-bottom: ${spaces.s16};
            }
        `}</style>
    </>
)

export default DetailsPageSkeleton
