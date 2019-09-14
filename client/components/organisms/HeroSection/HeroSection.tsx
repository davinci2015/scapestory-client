import React from 'react'
import numeral from 'numeral'

import {backgroundImage} from 'styles/mixins'
import {borderRadius, spaces, colors, zIndex, media} from 'styles'
import {Headline, Icon, FormattedMessage, Paragraph, IconText, Tag} from 'components/atoms'
import {UserWidget} from 'components/molecules'
import {navigationHeight} from 'components/molecules/Navigation'

interface Props {
    image: string
    title: string
    userImage: string
    username: string
    viewsCount: number
    likesCount: number
    tags: string[]
}

const HeroSection = ({
    image,
    title,
    userImage,
    username,
    likesCount,
    viewsCount,
    tags
}: Props) => (
        <div className="hero-section">
            <div className="image">
                <div className="badge">
                    <div className="badge-icon">
                        <Icon d={Icon.FIRE} color={colors.WHITE} />
                    </div>
                    <Paragraph type="body" color={colors.WHITE}>
                        <FormattedMessage id="hero_section.editor_choice" defaultMessage="Editor's Choice" />
                    </Paragraph>
                </div>
                <div className="content">
                    <Headline as="h1" variant="h2" color={colors.WHITE}>
                        {title}
                    </Headline>
                    <div className="content-info">
                        <div className="user-info">
                            <UserWidget
                                size="large"
                                variant="border"
                                color={colors.WHITE}
                                image={userImage}
                                text={
                                    <Paragraph type="body" color={colors.WHITE}>
                                        <FormattedMessage
                                            id="hero_section.aquascape_author"
                                            defaultMessage="by {username}"
                                            values={{username}}
                                        />
                                    </Paragraph>
                                }
                            />
                            <div className="stat-info">
                                <div>
                                    <IconText icon={Icon.EYE_SHOW_FULL} text={numeral(viewsCount).format('0,0')} color={colors.WHITE}/>
                                </div>
                                <div className="stat-icon">
                                    <IconText icon={Icon.HEART} text={numeral(likesCount).format('0,0')} color={colors.WHITE}/>
                                </div>
                            </div>
                        </div>
                        <div className="tags">
                            {tags.map((tag, index) => <Tag key={index} text={tag} variant="primary" size="large"/>)}
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .hero-section {
                    padding-top: ${navigationHeight.default};
                }

                @media ${media.up('medium')} {
                    .hero-section {
                        margin-top: ${spaces.s60};
                        padding-top: ${navigationHeight.default};
                    }
                }

                .image {
                    position: relative;
                    height: 80vh;
                    margin-left: -${spaces.s24};
                    margin-right: -${spaces.s24};
                    z-index: -1;
                    ${backgroundImage(image)}
                }

                @media ${media.up('medium')} {
                    .image {
                        height: 646px;
                        margin: 0;
                        border-radius: ${borderRadius.SECONDARY};
                    }
                }

                .image::before,
                .image::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    right: 0;
                    border-radius: ${borderRadius.SECONDARY};
                }

                .image::before {
                    top: 0;
                    height: 120px;
                    z-index: -1;
                    background-image: linear-gradient(to bottom, ${colors.BLACK}, rgba(0, 0, 0, 0));
                }

                .image::after {
                    bottom: 0;
                    height: 200px;
                    background-image: linear-gradient(to top, ${colors.BLACK}, rgba(0, 0, 0, 0));
                }

                .badge {
                    display: flex;
                    align-items: center;
                    padding-top: ${spaces.s18};
                    padding-left: ${spaces.s18};
                }

                @media ${media.up('medium')} {
                    .badge {
                        padding-top: ${spaces.s30};
                        padding-left: ${spaces.s48};
                    }
                }

                .badge-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    margin-right: ${spaces.s18};
                    height: ${spaces.s36};  
                    width: ${spaces.s36};
                    
                    border-radius: 50%;
                    background-image: linear-gradient(to bottom, ${colors.SECONDARY}, ${colors.SECONDARY_DARK});
                }

                .content {
                    position: absolute;
                    left: ${spaces.s18};
                    width: calc(100% - 36px);
                    bottom: ${spaces.s18};
                    z-index: ${zIndex.DEFAULT};
                }

                @media ${media.up('medium')} {
                    .content {
                        left: ${spaces.s48};
                        width: calc(100% - 96px);
                        bottom: ${spaces.s42};
                    }

                    .content :global(.${Headline.classes.root}) {
                        margin-bottom: ${spaces.s42};
                    }
                }

                .content-info {
                    display: flex;
                    width: 100%;
                    justify-content: space-between;
                }

                .user-info {
                    display: flex;
                    align-items: center;
                }

                .stat-info {
                    display: flex;
                    margin-left: ${spaces.s60};
                }

                .stat-icon {
                    margin-left: ${spaces.s24};
                }

                .tags :global(.${Tag.classes.root}) {
                    margin-left: ${spaces.s12};
                }
            `}</style>
        </div>
    )

export default HeroSection