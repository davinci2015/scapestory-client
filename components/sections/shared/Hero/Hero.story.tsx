import React from 'react'
import {storiesOf} from '@storybook/react'

import {Hero} from 'components/sections/shared'
import {colors} from 'styles'
import {Paragraph, IconText, Icon} from 'components/atoms'
import mock from 'mocks/storybook'

import {createTag} from 'components/atoms/Tag/Tag.story'
import {createUserWidget} from 'components/molecules/UserWidget/UserWidget.story'
import {UserWidgetSize, UserWidgetVariant} from 'components/molecules/UserWidget/UserWidget'

storiesOf('Sections | Hero', module).add('default', () => (
    <Hero
        image={mock.aquascapeImage}
        title="Aquascape title"
        topSection={
            <Hero.TopSection>
                <Hero.TopLeft>
                    <Paragraph type="body" color={colors.WHITE}>
                        Top left
                    </Paragraph>
                </Hero.TopLeft>
                <Hero.TopRight>
                    <Paragraph type="body" color={colors.WHITE}>
                        Top right
                    </Paragraph>
                </Hero.TopRight>
            </Hero.TopSection>
        }
        bottomSection={
            <Hero.BottomSection>
                <Hero.BottomLeft>
                    {createUserWidget(
                        <Paragraph type="body" color={colors.WHITE}>
                            by {mock.name}
                        </Paragraph>,
                        UserWidgetSize.s36,
                        UserWidgetVariant.BORDER
                    )}

                    <IconText icon={Icon.EYE_SHOW_FULL} text={10} color={colors.WHITE} />
                    <IconText icon={Icon.HEART} text={10} color={colors.WHITE} />
                </Hero.BottomLeft>
                <Hero.BottomRight>
                    {createTag('large')}
                    {createTag('large')}
                    {createTag('large')}
                </Hero.BottomRight>
            </Hero.BottomSection>
        }
    />
))
