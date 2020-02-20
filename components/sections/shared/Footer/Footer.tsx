import React from 'react'
import Link from 'next/link'

import {colors, spaces, media} from 'styles'
import {Paragraph, FormattedMessage, Icon} from 'components/atoms'
import routes from 'routes'
import config from 'config'

const classes = {
    root: 'footer',
}

interface Props {}

type FooterType = React.FunctionComponent<Props> & {
    classes: typeof classes
}

const Footer: FooterType = () => (
    <>
        <div className={classes.root}>
            <div className="top">
                <Link href={routes.index}>
                    <a>
                        <img className="logo" src="/static/logo-simple.svg" />
                    </a>
                </Link>
                <div>
                    <ul>
                        <li>
                            <Link href={routes.index}>
                                <a>
                                    <Paragraph weight="bold">
                                        <FormattedMessage id="footer.home" defaultMessage="Home" />
                                    </Paragraph>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={routes.privacyPolicy}>
                                <a>
                                    <Paragraph weight="bold">
                                        <FormattedMessage
                                            id="footer.privacy_policy"
                                            defaultMessage="Privacy Policy"
                                        />
                                    </Paragraph>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={routes.termsAndConditions}>
                                <a>
                                    <Paragraph weight="bold">
                                        <FormattedMessage
                                            id="footer.terms_and_conditions"
                                            defaultMessage="Terms & Conditions"
                                        />
                                    </Paragraph>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <a href={`mailto:${config.CONTACT_EMAIL}`}>
                                <Paragraph weight="bold">
                                    <FormattedMessage
                                        id="footer.contact"
                                        defaultMessage="Contact"
                                    />
                                </Paragraph>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="social-icons">
                    <a
                        className="social-icon"
                        href="https://www.facebook.com/Scapestory-102860264647447"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Icon d={Icon.FACEBOOK_OUTLINE} viewBox="0 0 48 48" size={24} />
                    </a>
                    <a
                        className="social-icon"
                        href="https://www.instagram.com/scapestory"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Icon d={Icon.INSTAGRAM} viewBox="0 0 48 48" size={24} />
                    </a>
                </div>
            </div>

            <div className="bottom">
                <div>
                    <Paragraph type="s1" color={colors.SHADE_DEEP}>
                        Made with ❤️ in Osijek
                    </Paragraph>
                </div>
                <div>
                    <Paragraph type="s1" color={colors.SHADE_DEEP}>
                        © Scapestory {new Date().getFullYear()}
                    </Paragraph>
                </div>
            </div>
        </div>
        <style jsx>{`
            .footer {
                background-color: ${colors.WHITE};
                border-top: 1px solid ${colors.SHADE_EXTRA_LIGHT};
            }

            .top {
                display: flex;
                justify-content: space-between;
                flex-direction: column;
                align-items: center;
                padding: ${spaces.s60};
            }

            @media ${media.up('medium')} {
                .top {
                    flex-direction: row;
                }
            }

            .top ul {
                display: flex;
                flex-direction: column;
                text-align: center;

                margin: ${spaces.s18} 0;
                padding: 0;
            }

            @media ${media.up('medium')} {
                .top ul {
                    flex-direction: row;
                    margin: 0;
                }
            }

            .top ul li {
                margin: ${spaces.s16} 0;
                list-style: none;
            }

            @media ${media.up('medium')} {
                .top ul li {
                    margin: 0 ${spaces.s12};
                }
            }

            @media ${media.up('large')} {
                .top ul li {
                    margin: 0 ${spaces.s30};
                }
            }

            .top ul li a {
                text-decoration: none;
                color: ${colors.BLACK};
                transition: color 100ms linear;
                cursor: pointer;
            }

            .top ul li a:hover {
                color: ${colors.PRIMARY};
            }

            .bottom {
                display: flex;
                flex-direction: column;
                align-items: center;

                padding: ${spaces.s18} ${spaces.s60} ${spaces.s24} ${spaces.s60};
                border-top: 1px solid ${colors.SHADE_EXTRA_LIGHT};
            }

            @media ${media.up('small')} {
                .bottom {
                    justify-content: space-between;
                    flex-direction: row;
                    align-items: stretch;
                }
            }

            .social-icons {
                margin: 0 -${spaces.s12};
            }

            .social-icon {
                margin: 0 ${spaces.s12};
                transition: fill 100ms ease-in-out;
            }

            .social-icon:hover {
                fill: ${colors.PRIMARY};
            }
        `}</style>
    </>
)

Footer.classes = classes

export default Footer
