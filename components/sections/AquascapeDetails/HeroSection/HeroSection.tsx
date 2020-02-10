import React, {SyntheticEvent} from 'react'

import {
    FormattedMessage,
    Paragraph,
    Icon,
    Tag,
    IconText,
    Button,
    IconButton,
} from 'components/atoms'
import {colors, spaces, zIndex, media} from 'styles'
import {Hero} from 'components/sections/shared'
import {UserWidget, UnfollowButton, FollowButton} from 'components/molecules'
import {AquascapeDetailsQuery} from 'graphql/generated/queries'
import {ProfileLink} from 'components/core'
import {UserWidgetSize, UserWidgetVariant} from 'components/molecules/UserWidget/UserWidget'

interface Props {
    mineAquascape: boolean
    aquascape: AquascapeDetailsQuery['aquascape']
    toggleLike: VoidFunction
    toggleFollow: VoidFunction
    onEdit: VoidFunction
    onShare: VoidFunction
}

const HeartIcon = ({count}: {count: number}) => (
    <IconText icon={Icon.HEART} text={count} color={colors.WHITE} />
)

const HeroSection: React.FunctionComponent<Props> = ({
    aquascape,
    mineAquascape,
    onEdit,
    onShare,
    toggleFollow,
    toggleLike,
}) => {
    if (!aquascape || !aquascape.user) return null

    return (
        <>
            <Hero
                variant="cover"
                title={aquascape.title}
                image={aquascape.mainImageUrl}
                topSection={
                    <div className="top-section">
                        <Hero.TopLeft>
                            <ProfileLink slug={aquascape.user.slug}>
                                <UserWidget
                                    size={UserWidgetSize.s36}
                                    variant={UserWidgetVariant.BORDER}
                                    image={aquascape.user.profileImage}
                                    text={
                                        <div>
                                            <Paragraph
                                                type="body"
                                                color={colors.WHITE}
                                                weight="bold"
                                            >
                                                <FormattedMessage
                                                    id="aquascape.hero_section.username"
                                                    defaultMessage="by {username}"
                                                    values={{username: aquascape.user.name}}
                                                />
                                            </Paragraph>
                                            {!mineAquascape && (
                                                <div
                                                    className="follow"
                                                    onClick={(event: SyntheticEvent) => {
                                                        event.preventDefault()
                                                        toggleFollow()
                                                    }}
                                                    role="presentation"
                                                >
                                                    <Paragraph
                                                        type="s2"
                                                        color={colors.WHITE}
                                                        weight="semibold"
                                                    >
                                                        {aquascape.user?.isFollowedByMe ? (
                                                            <FormattedMessage
                                                                id="aquascape.hero_section.unfollow"
                                                                defaultMessage="Unfollow"
                                                            />
                                                        ) : (
                                                            <FormattedMessage
                                                                id="aquascape.hero_section.follow"
                                                                defaultMessage="Follow"
                                                            />
                                                        )}
                                                    </Paragraph>
                                                </div>
                                            )}
                                        </div>
                                    }
                                />
                            </ProfileLink>
                        </Hero.TopLeft>
                        <Hero.TopRight>
                            <Hero.ActionButtons>
                                {!mineAquascape && (
                                    <Button
                                        onClick={toggleLike}
                                        leftIcon={
                                            <Icon
                                                d={
                                                    aquascape.isLikedByMe
                                                        ? Icon.HEART
                                                        : Icon.HEART_OUTLINE
                                                }
                                                color={colors.WHITE}
                                            />
                                        }
                                        dimensions="extraSmall"
                                        color="tertiary"
                                    >
                                        <FormattedMessage
                                            id="aquascape.hero_section.like"
                                            defaultMessage="Like"
                                        />
                                    </Button>
                                )}
                                <Button
                                    onClick={onShare}
                                    leftIcon={<Icon d={Icon.SHARE} color={colors.WHITE} />}
                                    dimensions="extraSmall"
                                    color="tertiary"
                                >
                                    <FormattedMessage
                                        id="aquascape.hero_section.share"
                                        defaultMessage="Share"
                                    />
                                </Button>
                                {mineAquascape && (
                                    <Button
                                        leftIcon={<Icon d={Icon.EDIT} color={colors.WHITE} />}
                                        dimensions="extraSmall"
                                        color="tertiary"
                                        onClick={onEdit}
                                    >
                                        <FormattedMessage
                                            id="aquascape.hero_section.edit"
                                            defaultMessage="Edit"
                                        />
                                    </Button>
                                )}
                                {!mineAquascape &&
                                    (aquascape.user.isFollowedByMe ? (
                                        <UnfollowButton toggleFollow={toggleFollow} />
                                    ) : (
                                        <FollowButton toggleFollow={toggleFollow} />
                                    ))}
                            </Hero.ActionButtons>
                        </Hero.TopRight>
                    </div>
                }
                bottomSection={
                    <Hero.BottomSection>
                        <Hero.BottomLeft>
                            <div className="icons">
                                <IconText
                                    icon={Icon.EYE_SHOW_FULL}
                                    text={aquascape.viewsCount}
                                    color={colors.WHITE}
                                />
                                {mineAquascape ? (
                                    <HeartIcon count={aquascape.likesCount} />
                                ) : (
                                    <IconButton onClick={toggleLike}>
                                        <HeartIcon count={aquascape.likesCount} />
                                    </IconButton>
                                )}
                            </div>
                        </Hero.BottomLeft>
                        <Hero.BottomRight>
                            {aquascape.tags.map((tag, index) => (
                                <Tag key={index} text={tag.name} variant="primary" size="large" />
                            ))}
                        </Hero.BottomRight>
                    </Hero.BottomSection>
                }
            />

            <style jsx>{`
                .icons {
                    margin-left: -${spaces.s12};
                }

                .follow {
                    cursor: pointer;
                }

                .top-section {
                    display: flex;
                    flex-direction: column;
                    z-index: ${zIndex.DEFAULT};
                }

                @media ${media.up('medium')} {
                    .top-section {
                        flex-direction: row;
                        justify-content: space-between;
                    }
                }
            `}</style>
        </>
    )
}

export default HeroSection
