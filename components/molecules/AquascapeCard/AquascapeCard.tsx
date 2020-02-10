import React, {useContext} from 'react'
import numeral from 'numeral'
import Truncate from 'react-truncate'
import classnames from 'classnames'

import {Headline, IconText, Icon, Paragraph, FormattedMessage} from 'components/atoms'
import {colors, spaces, borderRadius, media, breakpoints} from 'styles'
import UserWidget from 'components/molecules/UserWidget'
import {AquascapeDetailsLink, ProfileLink, Hide} from 'components/core'
import config from 'config'
import {AquascapeFieldsFragment} from 'graphql/generated/queries'
import {AuthContext} from 'providers/AuthenticationProvider'
import routes, {createDynamicPath, getAquascapeDetailsSlug} from 'routes'
import {Transition} from 'react-transition-group'
import {TransitionStatus} from 'react-transition-group/Transition'
import Link from 'next/link'
import {pxToNumber} from 'utils/converter'

interface Props {
    id: number
    user?: AquascapeFieldsFragment['user'] | null
    image?: string | null
    title?: string | null
    viewsCount: number
    likesCount: number
}

const classes = {
    root: 'aquascape-card',
}

const AquascapeCard = ({id, image, likesCount = 0, title, user, viewsCount = 0}: Props) => {
    const {user: loggedInUser} = useContext(AuthContext)

    const href =
        user && loggedInUser && user.id === loggedInUser.id
            ? routes.aquascapeDetailsEdit
            : routes.aquascapeDetails

    const as = createDynamicPath(href, {
        id: id.toString(),
        title: getAquascapeDetailsSlug(title || config.AQUASCAPE_TITLE_PLACEHOLDER),
    })

    return (
        <>
            <Transition in timeout={400} appear>
                {(state: TransitionStatus) => (
                    <div className={classnames(classes.root, state)}>
                        <AquascapeDetailsLink href={href} as={as}>
                            <div className="card__header">
                                <img
                                    className="header-image"
                                    src={image || config.AQUASCAPE_MAIN_IMAGE_PLACEHOLDER}
                                    alt="Aquascape"
                                />
                                <div className="header-gradient"></div>
                                <div className="icons">
                                    <IconText
                                        icon={Icon.EYE_SHOW_FULL}
                                        text={numeral(viewsCount).format('0a')}
                                        color={colors.WHITE}
                                        size="small"
                                    />
                                    <IconText
                                        icon={Icon.HEART}
                                        text={numeral(likesCount).format('0a')}
                                        color={colors.WHITE}
                                        size="small"
                                    />
                                </div>
                            </div>
                        </AquascapeDetailsLink>
                        <div className="card__body">
                            <div className="headline">
                                <Headline as="h2" variant="h5">
                                    <Truncate trimWhitespace>
                                        {title || (
                                            <FormattedMessage
                                                id="aquascape_card.placeholder_title"
                                                defaultMessage="{name}'s aquascape"
                                                values={{name: user?.name}}
                                            />
                                        )}
                                    </Truncate>
                                </Headline>
                            </div>
                            <div className="card__footer">
                                <ProfileLink slug={user?.slug || ''}>
                                    <UserWidget
                                        placeholder={user?.name.charAt(0)}
                                        image={user?.profileImage}
                                        text={
                                            <Paragraph type="t1" color={colors.SHADE_DEEP}>
                                                <FormattedMessage
                                                    id="aquascape_card.created_by"
                                                    defaultMessage="by {name}"
                                                    values={{name: user?.name}}
                                                />
                                            </Paragraph>
                                        }
                                    />
                                </ProfileLink>
                                <Hide after={pxToNumber(breakpoints.medium)}>
                                    <div>
                                        <Link href={href} as={as}>
                                            <a className="details-link">
                                                <Paragraph color={colors.PRIMARY} weight="semibold">
                                                    <FormattedMessage
                                                        id="aquascape_card.details"
                                                        defaultMessage="Details"
                                                    />
                                                </Paragraph>
                                                <Icon
                                                    d={Icon.ARROW_RIGHT_FILL}
                                                    color={colors.PRIMARY}
                                                />
                                            </a>
                                        </Link>
                                    </div>
                                </Hide>
                            </div>
                        </div>
                    </div>
                )}
            </Transition>

            <style jsx>{`
                .aquascape-card {
                    position: relative;
                    background-color: ${colors.WHITE};
                    width: 100%;
                    opacity: 0;

                    border: 1px solid ${colors.SHADE_EXTRA_LIGHT};
                    border-radius: ${borderRadius.TERTIARY};

                    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.04);
                    text-decoration: none;
                    transition: box-shadow 200ms ease-in, opacity 400ms ease-in-out;
                }

                .aquascape-card.entered {
                    opacity: 1;
                }

                .aquascape-card:hover {
                    box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
                }

                .card__header {
                    display: block;
                    position: relative;
                    height: 180px;
                    width: calc(100% + 2px);
                    margin-left: -1px;

                    cursor: pointer;
                    overflow: hidden;

                    border-top-left-radius: ${borderRadius.TERTIARY};
                    border-top-right-radius: ${borderRadius.TERTIARY};
                }

                .header-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .header-gradient {
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    height: 72px;
                    background: linear-gradient(to bottom, ${colors.BLACK}, rgba(0, 0, 0, 0));
                }

                .card__header > .icons {
                    position: absolute;
                    top: 0;
                    width: 100%;
                    text-align: right;
                    padding: ${spaces.s18} ${spaces.s16} 0 ${spaces.s16};
                }

                .card__header > .icons > :global(.${IconText.classes.root}) {
                    margin-left: ${spaces.s12};
                    opacity: 0.9;
                }

                .card__header > .icons > :global(.${IconText.classes.root}) :global(svg) {
                    height: 16px;
                    width: 16px;
                }

                .card__body {
                    padding: ${spaces.s12} ${spaces.s18} ${spaces.s18} ${spaces.s18};
                }

                .card__body > .headline :global(.${Headline.classes.root}) {
                    margin-top: 0;
                    height: 48px;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }

                .card__footer {
                    display: flex;
                    justify-content: space-between;
                }

                .card__footer .user-link {
                    text-decoration: none;
                }

                .card__footer .details-link {
                    text-decoration: none;
                    display: flex;
                    padding-left: ${spaces.s12};
                }

                .card__footer .details-link :global(.${Paragraph.classes.root}) {
                    margin-right: ${spaces.s6};
                }

                @media ${media.up('extraSmall')} {
                    .card__header {
                        height: 200px;
                    }
                }

                @media ${media.up('small')} {
                    .card__header {
                        height: 244px;
                    }
                }

                @media ${media.up('medium')} {
                    .card__header {
                        height: 264px;
                    }
                }
            `}</style>
        </>
    )
}

AquascapeCard.classes = classes

export default AquascapeCard
