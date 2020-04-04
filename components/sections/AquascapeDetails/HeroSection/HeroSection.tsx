import React, {SyntheticEvent, useMemo, useContext, useCallback} from 'react'

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
import {AquascapeDetailsQuery, User_ProfileQuery} from 'graphql/generated/queries'
import {ProfileLink, Hide} from 'components/core'
import {UserWidgetSize, UserWidgetVariant} from 'components/molecules/UserWidget/UserWidget'
import {pxToNumber} from 'utils/converter'
import useModal from 'hooks/useModal'
import {getImageCharPlaceholder} from 'utils/user'
import {ModalContext} from 'providers/ModalProvider'
import {attachTrackEvent, analyticsEvents} from 'utils/analytics'

interface Props {
    currentUser?: User_ProfileQuery['me']
    isLikedByCurrentUser?: boolean
    isFollowedByCurrentUser: boolean
    isCurrentUserAquascapeOwner: boolean
    aquascape: AquascapeDetailsQuery['aquascape']
    toggleLike: VoidFunction
    toggleFollow: (userId: number) => void
    onEdit: VoidFunction
    onShare: VoidFunction
}

const HeartIcon = ({count}: {count: number}) => (
    <IconText icon={Icon.HEART} text={count} color={colors.WHITE} />
)

const LIKES_STACK_COUNT = 3

const HeroSection: React.FunctionComponent<Props> = ({
    aquascape,
    currentUser,
    isCurrentUserAquascapeOwner,
    isFollowedByCurrentUser,
    isLikedByCurrentUser,
    onEdit,
    onShare,
    toggleFollow,
    toggleLike,
}) => {
    const {close, isOpen, open} = useModal()
    const {openModal} = useContext(ModalContext)

    if (!aquascape || !aquascape.user) return null

    const onFollowClick = (event: SyntheticEvent) => {
        event.preventDefault()
        aquascape.user && toggleFollow(aquascape.user.id)
    }

    const openRegisterModal = useCallback(() => {
        openModal('register')
        close()
    }, [])

    const stackImages = useMemo(
        () =>
            aquascape.likes.rows.slice(0, LIKES_STACK_COUNT).map(like => ({
                url: like.user.profileImage,
                placeholder: getImageCharPlaceholder(like.user.name),
            })),
        [aquascape]
    )

    const stackPlaceholder =
        aquascape.likes.count > LIKES_STACK_COUNT
            ? `+${aquascape.likes.count - LIKES_STACK_COUNT}`
            : undefined

    const openUserListModalTracked = attachTrackEvent(open)(analyticsEvents.like.likeUserListOpened)
    const openRegisterModalTracked = attachTrackEvent(openRegisterModal)(
        analyticsEvents.anonymousUser.follow
    )

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
                                    placeholder={getImageCharPlaceholder(aquascape.user.name)}
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
                                            {!isCurrentUserAquascapeOwner && (
                                                <Hide upTo={pxToNumber(breakpoints.medium)}>
                                                    <div
                                                        className="follow"
                                                        onClick={onFollowClick}
                                                        role="presentation"
                                                    >
                                                        <Paragraph
                                                            type="s2"
                                                            color={colors.WHITE}
                                                            weight="semibold"
                                                        >
                                                            {isFollowedByCurrentUser ? (
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
                                <a className="image-stack" onClick={openUserListModalTracked}>
                                    <ImageStack
                                        images={stackImages}
                                        placeholder={stackPlaceholder}
                                    />
                                </a>
                            </Hide>
                            <Hero.ActionButtons>
                                {!isCurrentUserAquascapeOwner && (
                                    <Button
                                        onClick={toggleLike}
                                        leftIcon={
                                            <Icon
                                                d={
                                                    isLikedByCurrentUser
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
                                {isCurrentUserAquascapeOwner && (
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
                        <Hero.BottomLeft className="bottom-left">
                            <div className="icons">
                                <IconText
                                    icon={Icon.EYE_SHOW_FULL}
                                    text={aquascape.viewsCount}
                                    color={colors.WHITE}
                                />
                                {isCurrentUserAquascapeOwner ? (
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
                                <a className="image-stack" onClick={openUserListModalTracked}>
                                    <ImageStack
                                        images={stackImages}
                                        placeholder={stackPlaceholder}
                                    />
                                </a>
                            </Hide>
                        </Hero.BottomRight>
                    </Hero.BottomSection>
                }
            />

            <UserListModal
                openRegisterModal={openRegisterModalTracked}
                isOpen={isOpen}
                currentUser={currentUser}
                users={aquascape.likes.rows.map(like => like.user)}
                onClose={close}
                toggleFollow={toggleFollow}
                title={
                    <Headline variant="h4">
                        <FormattedMessage
                            id="aquascape.hero_section.liked_by"
                            defaultMessage="Liked by"
                        />
                    </Headline>
                }
            />

            <style jsx>{`
                .icons {
                    margin-left: -${spaces.s12};
                    margin-bottom: -${spaces.s4};
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

                .image-stack {
                    cursor: pointer;
                }

                :global(.bottom-left) {
                    display: flex;
                    align-items: center;
                }

                @media ${media.up('medium')} {
                    .top-section {
                        flex-direction: row;
                        justify-content: space-between;
                    }

                    .icons {
                        margin-bottom: 0;
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
