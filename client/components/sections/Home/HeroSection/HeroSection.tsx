import React from 'react'

import {Badge, FormattedMessage, Paragraph, Icon, Tag, IconText} from 'components/atoms'
import {AquascapeData} from 'containers/Home/query'
import {colors, spaces} from 'styles'
import Hero from 'components/sections/Hero'
import {UserWidget} from 'components/molecules'

interface Props {
    aquascape: AquascapeData
}

const HeroSection = ({aquascape}: Props) => (
    <>
        <div className="section">
            <Hero
                title={aquascape.title}
                image={aquascape.mainImage}
                topSection={
                    <Hero.TopSection>
                        <Hero.TopLeft>
                            <Badge background="gradient" icon={<Icon d={Icon.FIRE} color={colors.WHITE} />}>
                                <Paragraph type="body" color={colors.WHITE} weight="bold">
                                    <FormattedMessage id="hero_section.editor_choice" defaultMessage="Editor's Choice" />
                                </Paragraph>
                            </Badge>
                        </Hero.TopLeft>
                    </Hero.TopSection>
                }
                bottomSection={
                    <Hero.BottomSection>
                    <Hero.BottomLeft>
                        <UserWidget
                            size="large"
                            variant="border"
                            image={aquascape.user.profileImage}
                            text={
                                <Paragraph type="body" color={colors.WHITE}>
                                    <FormattedMessage
                                        id="hero_section.aquascape_author"
                                        defaultMessage="by {username}"
                                        values={{username: aquascape.user.name || aquascape.user.username}}
                                    />
                                </Paragraph>
                            }
                        />
          
                      <IconText icon={Icon.EYE_SHOW_FULL} text={aquascape.viewsCount} color={colors.WHITE} />
                      <IconText icon={Icon.HEART} text={aquascape.likesCount} color={colors.WHITE} />
                    </Hero.BottomLeft>
                    <Hero.BottomRight>
                        {aquascape.tags.map((tag, index) => <Tag key={index} text={tag.name} variant="primary" size="large" />)}
                    </Hero.BottomRight>
                  </Hero.BottomSection>
                }
            />
        </div>
        
        <style jsx>{`
            .section {
                padding-top: ${spaces.s60};
            }  
        `}</style>
    </>
)

export default HeroSection