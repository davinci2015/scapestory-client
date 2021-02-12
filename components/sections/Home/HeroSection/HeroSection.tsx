import React, {useCallback, SyntheticEvent} from 'react'

import {Badge, FormattedMessage, Paragraph, Icon, Tag, IconText} from 'components/atoms'
import {colors, spaces, media} from 'styles'
import {Hero} from 'components/sections/shared'
import {UserWidget} from 'components/molecules'
import {FeaturedAquascapesQuery} from 'graphql/generated/queries'
import {AquascapeDetailsLink} from 'components/core'
import {useRouter} from 'next/router'
import routes, {createDynamicPath, getAquascapeDetailsSlug} from 'routes'
import {UserWidgetSize, UserWidgetVariant} from 'components/molecules/UserWidget/UserWidget'
import {getImageCharPlaceholder} from 'utils/user'
import config from 'config'

interface Props {
    aquascape: FeaturedAquascapesQuery['featured']
}

const HeroSection: React.FunctionComponent<Props> = ({aquascape}) => {
    const router = useRouter()
    if (!aquascape) return null

    const redirectToProfile = useCallback(
        (event: SyntheticEvent) => {
            if (!aquascape.user) return
            event.preventDefault()
            router.push(createDynamicPath(routes.profile, {slug: aquascape.user.slug}))
        },
        [aquascape]
    )

    const detailsLink = createDynamicPath(routes.aquascapeDetails, {
        id: aquascape.id.toString(),
        title: getAquascapeDetailsSlug(aquascape.title || config.AQUASCAPE_URL_TITLE_PLACEHOLDER),
    })

    return (
        <>
            <div className="hero-section">
                <AquascapeDetailsLink href={detailsLink} as={detailsLink}>
                    <Hero
                        title={aquascape.title}
                        image={aquascape.mainImageUrl}
                        topSection={
                            <Hero.TopSection>
                                <Hero.TopLeft>
                                    <Badge
                                        background="gradient"
                                        icon={<Icon d={Icon.FIRE} color={colors.WHITE} />}
                                    >
                                        <Paragraph type="body" color={colors.WHITE} weight="bold">
                                            <FormattedMessage
                                                id="hero_section.featured"
                                                defaultMessage="Featured"
                                            />
                                        </Paragraph>
                                    </Badge>
                                </Hero.TopLeft>
                            </Hero.TopSection>
                        }
                        bottomSection={
                            <Hero.BottomSection>
                                <div className="bottom-left">
                                    {aquascape.user && (
                                        <UserWidget
                                            placeholder={getImageCharPlaceholder(
                                                aquascape.user.name
                                            )}
                                            onClick={redirectToProfile}
                                            size={UserWidgetSize.s36}
                                            variant={UserWidgetVariant.BORDER}
                                            image={aquascape.user.profileImage}
                                            text={
                                                <Paragraph type="body" color={colors.WHITE}>
                                                    <FormattedMessage
                                                        id="hero_section.aquascape_author"
                                                        defaultMessage="by {username}"
                                                        values={{username: aquascape.user.name}}
                                                    />
                                                </Paragraph>
                                            }
                                        />
                                    )}
                                    <div className="stats">
                                        <IconText
                                            icon={Icon.EYE_SHOW_FULL}
                                            text={aquascape.viewsCount}
                                            color={colors.WHITE}
                                        />
                                        <IconText
                                            icon={Icon.HEART}
                                            text={aquascape.likesCount}
                                            color={colors.WHITE}
                                        />
                                    </div>
                                </div>
                                <Hero.BottomRight>
                                    {aquascape.tags.map((tag, index) => (
                                        <Tag
                                            key={index}
                                            text={tag.name}
                                            variant="primary"
                                            size="large"
                                        />
                                    ))}
                                </Hero.BottomRight>
                            </Hero.BottomSection>
                        }
                    />
                </AquascapeDetailsLink>
            </div>

            <style jsx>{`
                .hero-section {
                    margin: 0 -${spaces.s16};
                }

                .hero-section a {
                    text-decoration: none;
                }

                .hero-section :global(.${UserWidget.classes.root}) {
                    margin-right: ${spaces.s30};
                }

                .stats {
                    margin-top: ${spaces.s18};
                    margin-left: -${spaces.s8};
                }

                @media ${media.up('medium')} {
                    .hero-section {
                        padding-top: ${spaces.s60};
                        margin: 0;
                    }

                    .bottom-left {
                        display: flex;
                        align-items: center;
                    }

                    .bottom-left .stats {
                        margin-top: 0;
                        margin-left: 0;
                    }
                }
            `}</style>
        </>
    )
}

export default HeroSection
