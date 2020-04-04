import React from 'react'
import Link from 'next/link'
import classnames from 'classnames'

import useScrollPosition from 'hooks/useScrollPosition'
import {Button, FormattedMessage, UserImage, Paragraph, Icon} from 'components/atoms'

import NavLink from './NavLink'
import routes, {createDynamicPath} from 'routes'
import {User_ProfileQuery} from 'graphql/generated/queries'
import {UserImageSize} from 'components/atoms/UserImage/UserImage'
import {media, spaces, breakpoints, typography, colors, zIndex} from 'styles'
import {Hide} from 'components/core'
import {pxToNumber} from 'utils/converter'
import AddAquascapeButton from '../AddAquascapeButton'
import {getImageCharPlaceholder} from 'utils/user'

interface Props {
    user?: User_ProfileQuery['me']
    unreadNotificationsCount: number
    isAuthenticated: boolean
    openLoginModal: VoidFunction
    openRegisterModal: VoidFunction
    onCreateAquascape: VoidFunction
}

export const navigationHeight = {
    DEFAULT: '94px',
    SLIM: '66px',
}

const maxNotificationsCount = 99
const scrollOffset = 80

const Navigation = ({
    isAuthenticated,
    onCreateAquascape,
    openLoginModal,
    openRegisterModal,
    unreadNotificationsCount,
    user,
}: Props) => {
    const {position} = useScrollPosition()
    const isSlim = position.y > scrollOffset

    return (
        <nav
            className={classnames('nav', {
                'nav--slim': isSlim,
            })}
        >
            <div className="container">
                <div className="left">
                    <Link href={routes.index}>
                        <a>
                            <picture>
                                <source
                                    media={`(min-width: ${breakpoints.medium})`}
                                    srcSet="/static/logo.svg"
                                />
                                <img src="/static/logo-simple.svg" alt="Scapestory" />
                            </picture>
                        </a>
                    </Link>
                    <NavLink href={routes.index}>
                        <a>
                            <FormattedMessage id="navigation_home" defaultMessage="Home" />
                        </a>
                    </NavLink>
                </div>
                <div className="right">
                    {!isAuthenticated && (
                        <>
                            <Hide upTo={pxToNumber(breakpoints.medium)}>
                                <div className="text">
                                    <Paragraph as="span" color={colors.SHADE_DEEP}>
                                        <FormattedMessage
                                            id="navigation.already_member"
                                            defaultMessage="Already a member?"
                                        />
                                    </Paragraph>
                                    <div className="signup" onClick={openLoginModal}>
                                        <Paragraph as="span" color={colors.PRIMARY} weight="bold">
                                            <FormattedMessage
                                                id="navigation.login"
                                                defaultMessage="Login"
                                            />
                                        </Paragraph>
                                    </div>
                                </div>
                            </Hide>
                            <div className="sign-up-btn">
                                <Button
                                    color="secondary"
                                    variant="outlined"
                                    dimensions="small"
                                    onClick={openRegisterModal}
                                >
                                    <FormattedMessage
                                        id="navigation.sign_up"
                                        defaultMessage="Sign Up"
                                    />
                                </Button>
                            </div>
                        </>
                    )}

                    <Hide upTo={pxToNumber(breakpoints.small)}>
                        <AddAquascapeButton onClick={onCreateAquascape} />
                    </Hide>

                    {isAuthenticated && user && (
                        <>
                            <Link href={routes.notifications}>
                                <a className="bell-btn">
                                    {unreadNotificationsCount > 0 && (
                                        <span>
                                            {unreadNotificationsCount > maxNotificationsCount
                                                ? maxNotificationsCount
                                                : unreadNotificationsCount}
                                        </span>
                                    )}
                                    <Icon
                                        d={Icon.BELL}
                                        color={
                                            unreadNotificationsCount > 0
                                                ? colors.PRIMARY
                                                : colors.SHADE_MIDDLE
                                        }
                                        size={30}
                                        viewBox="0 0 34 34"
                                    />
                                </a>
                            </Link>
                            <NavLink
                                as={createDynamicPath(routes.profile, {slug: user.slug})}
                                href={routes.profile}
                            >
                                <div>
                                    <UserImage
                                        size={UserImageSize.s36}
                                        image={user.profileImage}
                                        placeholder={getImageCharPlaceholder(user.name)}
                                    />
                                </div>
                            </NavLink>
                        </>
                    )}
                </div>
            </div>

            <style jsx>{`
                .nav {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: ${navigationHeight.DEFAULT};

                    z-index: ${zIndex.MEDIUM};
                    background-color: ${colors.WHITE};
                    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                    transition: height 180ms ease-in-out;
                }

                .nav--slim {
                    height: ${navigationHeight.SLIM};
                }

                .container {
                    height: 100%;
                    margin: 0 auto;
                    padding: 0 ${spaces.s18};

                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .left :global(img) {
                    padding-right: ${spaces.s8};
                    width: 41px;
                }

                .right,
                .left {
                    display: flex;
                    align-items: center;
                    height: 100%;
                }

                .right :global(.${UserImage.classes.root}) {
                    flex: 0 0 auto;
                    margin-left: 0;
                    cursor: pointer;
                }

                .right .sign-up-btn {
                    flex: 0;
                    margin-left: ${spaces.s12};
                    margin-right: ${spaces.s12};
                }

                .right .text {
                    flex: 1 1 100%;
                }

                .right .bell-btn {
                    position: relative;
                    margin: 0 ${spaces.s24};
                }

                .right .bell-btn > span {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    position: absolute;
                    right: -9px;
                    top: -3px;
                    width: 22px;
                    height: 22px;

                    font-size: ${typography.fontSize.fs11};
                    font-weight: ${typography.fontWeight.bold};
                    color: ${colors.WHITE};

                    background-color: ${colors.SECONDARY};
                    border-radius: 50%;
                    border: 1px solid ${colors.WHITE};
                }

                .right .text .signup {
                    display: inline;
                    margin-left: ${spaces.s6};
                    cursor: pointer;
                }

                @media ${media.up('medium')} {
                    .container {
                        padding: 0 ${spaces.s24} 0 ${spaces.s60};
                    }

                    .left :global(img) {
                        padding-right: ${spaces.s60};
                        width: auto;
                    }

                    .right .sign-up-btn {
                        margin-right: ${spaces.s24};
                        margin-left: ${spaces.s36};
                    }

                    .right :global(.${UserImage.classes.root}) {
                        flex: 0 0 auto;
                        margin-right: ${spaces.s36};
                        cursor: pointer;
                    }

                    .right .bell-btn {
                        margin: 0 ${spaces.s36};
                    }
                }
            `}</style>
        </nav>
    )
}

Navigation.NavLink = NavLink

export default Navigation
