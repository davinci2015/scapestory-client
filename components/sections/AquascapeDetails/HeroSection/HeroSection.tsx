import React, {SyntheticEvent, useMemo} from 'react'

import {
    FormattedMessage,
    Paragraph,
    Icon,
    IconText,
    Button,
    IconButton,
    ImageStack,
    Headline,
} from 'components/atoms'
import {colors, spaces, zIndex, media, breakpoints} from 'styles'
import {Hero} from 'components/sections/shared'
import {UserWidget, UserListModal} from 'components/molecules'
import {AquascapeDetailsQuery} from 'graphql/generated/queries'
import {ProfileLink, Hide} from 'components/core'
import {UserWidgetSize, UserWidgetVariant} from 'components/molecules/UserWidget/UserWidget'
import {pxToNumber} from 'utils/converter'
import {ImageStackSize} from 'components/atoms/ImageStack/ImageStack'

interface Props {
    isFollowedByMe?: boolean
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

const LIKES_STACK_COUNT = 4

const HeroSection: React.FunctionComponent<Props> = ({
    aquascape,
    isFollowedByMe,
    mineAquascape,
    onEdit,
    onShare,
    toggleFollow,
    toggleLike,
}) => {
    if (!aquascape || !aquascape.user) return null

    const stackImages = useMemo(
        () => aquascape.likes.rows.slice(0, LIKES_STACK_COUNT).map(like => like.user.profileImage),
        [aquascape]
    )

    const stackPlaceholder =
        aquascape.likes.count > LIKES_STACK_COUNT
            ? `+${aquascape.likes.count - LIKES_STACK_COUNT}`
            : undefined

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
                                    placeholder={aquascape.user.name.charAt(0)}
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
                                                {aquascape.user.name}
                                            </Paragraph>
                                            {!mineAquascape && (
                                                <Hide upTo={pxToNumber(breakpoints.medium)}>
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
                                                            {isFollowedByMe ? (
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
                                                </Hide>
                                            )}
                                        </div>
                                    }
                                />
                            </ProfileLink>
                        </Hero.TopLeft>
                        <Hero.TopRight className="top-right">
                            <Hide upTo={pxToNumber(breakpoints.medium)}>
                                <ImageStack images={stackImages} placeholder={stackPlaceholder} />
                            </Hide>
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
                                    <HeartIcon count={aquascape.likes.count} />
                                ) : (
                                    <IconButton onClick={toggleLike}>
                                        <HeartIcon count={aquascape.likes.count} />
                                    </IconButton>
                                )}
                            </div>
                        </Hero.BottomLeft>
                        <Hero.BottomRight>
                            <Hide after={pxToNumber(breakpoints.medium)}>
                                <ImageStack
                                    size={ImageStackSize.s24}
                                    images={stackImages}
                                    placeholder={stackPlaceholder}
                                />
                            </Hide>
                        </Hero.BottomRight>
                    </Hero.BottomSection>
                }
            />

            <UserListModal
                isOpen={false}
                users={aquascape.likes.rows.map(like => like.user)}
                onClose={() => null}
                title={
                    <Headline variant="h4">
                        <FormattedMessage
                            id="aquascape.hero_section.likes"
                            defaultMessage="Likes"
                        />
                    </Headline>
                }
            />

            <style jsx>{`
                .icons {
                    margin-left: -${spaces.s12};
                }

                .follow {
                    cursor: pointer;
                }

                .follow :global(.${Paragraph.classes.root}) {
                    text-decoration: underline;
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

                @media ${media.up('medium')} {
                    :global(.top-right) {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }
            `}</style>
        </>
    )
}

export default HeroSection
