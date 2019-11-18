import React from 'react'
import numeral from 'numeral'
import Link from 'next/link'

import {Headline, Tag, IconText, Icon, Paragraph} from 'components/atoms'
import {colors, spaces, borderRadius, media} from 'styles'
import UserWidget from 'components/molecules/UserWidget'
import {TagInterface} from 'interfaces'

interface Props {
    id: number,
    image: string
    slug: string
    userImage?: string
    title: React.ReactNode
    name: React.ReactNode
    viewsCount: number
    likesCount: number
    tags: TagInterface[]
}

const classes = {
    root: 'aquascape-card'
}

const AquascapeCard = ({
    id,
    image,
    userImage,
    name,
    title,
    slug,
    viewsCount = 0,
    likesCount = 0,
    tags = []
}: Props) => (
        <>
            <div className={classes.root}>
                <Link
                    key={id}
                    href="/aquascape/[title]/[id]"
                    as={`/aquascape/${slug}/${id}`}>
                    <a className="header">
                        <img className="header-image" src={image} alt="Aquascape" />
                        <div className="header-gradient"></div>
                        <div className="icons">
                            <IconText icon={Icon.EYE_SHOW_FULL} text={numeral(viewsCount).format('0a')} color={colors.WHITE} size="small" />
                            <IconText icon={Icon.HEART} text={numeral(likesCount).format('0a')} color={colors.WHITE} size="small" />
                        </div>
                    </a>
                </Link>
                <div className="body">
                    <div className="headline">
                        <Headline as="h2" variant="h5">{title}</Headline>
                    </div>
                    <div className="footer">
                        <UserWidget
                            image={userImage}
                            text={
                                <Paragraph type="t1" color={colors.SHADE_DEEP}>
                                    {name}
                                </Paragraph>
                            }
                        />
                        <div className="tags">
                            {tags.map((tag, index) => <Tag key={index} text={tag.name} variant="primary" />)}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .aquascape-card {
                    position: relative;
                    background-color: ${colors.WHITE};
                    width: 100%;
                    
                    border: 1px solid ${colors.SHADE_EXTRA_LIGHT};
                    border-radius: ${borderRadius.TERTIARY};
                    
                    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.04);
                    text-decoration: none;
                    transition: box-shadow 200ms ease-in;
                }

                .aquascape-card:hover {
                    box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
                }

                .header {
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

                @media ${media.up('extraSmall')} {
                    .header { 
                        height: 200px;
                    }
                }

                @media ${media.up('small')} {
                    .header { 
                        height: 244px;
                    }
                }

                @media ${media.up('medium')} {
                    .header { 
                        height: 264px;
                    }
                }

                .header-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .header-gradient {
                    position: absolute;
                    top: 0; left: 0; bottom: 0; right: 0;
                    height: 72px;
                    background: linear-gradient(to bottom, ${colors.BLACK}, rgba(0, 0, 0, 0));
                }

                .header > .icons {
                    position: absolute;
                    top: 0;
                    width: 100%;
                    text-align: right;
                    padding: ${spaces.s18} ${spaces.s16} 0 ${spaces.s16};
                }

                .header > .icons > :global(.${IconText.classes.root}) {
                    margin-left: ${spaces.s12};
                    opacity: .9;
                }

                .header > .icons > :global(.${IconText.classes.root}) :global(svg) {
                    height: 16px;
                    width: 16px;
                }

                .body {
                    padding: ${spaces.s12} ${spaces.s18} ${spaces.s18} ${spaces.s18};
                }

                .body > .headline :global(.${Headline.classes.root}) {
                    margin-top: 0;
                    height: 48px;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }

                .footer {
                    display: flex;
                    justify-content: space-between;
                }

                .footer > .tags :global(.${Tag.classes.root}) {
                    margin-left: ${spaces.s6};
                }
            `}</style>
        </>
    )

AquascapeCard.classes = classes

export default AquascapeCard