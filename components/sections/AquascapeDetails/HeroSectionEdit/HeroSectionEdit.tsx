import React from 'react'

import {FormattedMessage, Paragraph, Icon, Tag, IconText, Button, Headline} from 'components/atoms'
import {colors, spaces, zIndex, media} from 'styles'
import {Hero} from 'components/sections/shared'
import {UserWidget, ConfirmationModal} from 'components/molecules'
import {AquascapeDetailsQuery} from 'graphql/generated/queries'
import {ProfileLink, ImageUpload} from 'components/core'
import {UserWidgetSize, UserWidgetVariant} from 'components/molecules/UserWidget/UserWidget'
import ActionButtons from 'components/sections/shared/Hero/ActionButtons'

interface Props {
    aquascape: AquascapeDetailsQuery['aquascape']
    onTitleChange: (title: string) => void
    onImageChange: (files: FileList | null) => void
    onPreview: VoidFunction
    onRemove: VoidFunction
}

const HeroSection: React.FunctionComponent<Props> = ({
    aquascape,
    onImageChange,
    onPreview,
    onRemove,
    onTitleChange,
}) => {
    if (!aquascape || !aquascape.user) return null

    return (
        <>
            <Hero
                editMode={true}
                onTitleChange={onTitleChange}
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
                                        </div>
                                    }
                                />
                            </ProfileLink>
                        </Hero.TopLeft>
                        <Hero.TopRight>
                            <Hero.ActionButtons>
                                <ImageUpload
                                    onChange={onImageChange}
                                    render={({openFinder}) => (
                                        <Button
                                            leftIcon={
                                                <Icon
                                                    size={10}
                                                    d={Icon.CAMERA}
                                                    color={colors.WHITE}
                                                />
                                            }
                                            onClick={openFinder}
                                            dimensions="extraSmall"
                                            color="tertiary"
                                        >
                                            <FormattedMessage
                                                id="aquascape.hero_section.preview"
                                                defaultMessage="Change cover image"
                                            />
                                        </Button>
                                    )}
                                />
                                <Button
                                    leftIcon={
                                        <Icon
                                            size={20}
                                            d={Icon.EYE_SHOW}
                                            viewBox="0 0 48 48"
                                            color={colors.WHITE}
                                        />
                                    }
                                    dimensions="extraSmall"
                                    color="tertiary"
                                    onClick={onPreview}
                                >
                                    <FormattedMessage
                                        id="aquascape.hero_section.preview"
                                        defaultMessage="Preview"
                                    />
                                </Button>
                                <ConfirmationModal
                                    onConfirm={onRemove}
                                    title={
                                        <Headline variant="h4">
                                            <FormattedMessage
                                                id="aquascape.hero_section.remove_aquascape_title"
                                                defaultMessage="Are you sure that you want to delete your aquascape?"
                                            />
                                        </Headline>
                                    }
                                    description={
                                        <Paragraph color={colors.SHADE_DEEP}>
                                            <FormattedMessage
                                                id="aquascape.hero_section.remove_aquascape_description"
                                                defaultMessage="If you delete the aquascape all uploaded content for the aquascape will be deleted also."
                                            />
                                        </Paragraph>
                                    }
                                    render={({open}) => (
                                        <Button
                                            leftIcon={
                                                <Icon size={20} d={Icon.BIN} color={colors.WHITE} />
                                            }
                                            dimensions="extraSmall"
                                            color="tertiary"
                                            onClick={open}
                                        >
                                            <FormattedMessage
                                                id="aquascape.hero_section.delete_aquascape"
                                                defaultMessage="Delete aquascape"
                                            />
                                        </Button>
                                    )}
                                />
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
                                    text={aquascape.viewsCount === 0 ? 1 : aquascape.viewsCount}
                                    color={colors.WHITE}
                                />
                                <IconText
                                    icon={Icon.HEART}
                                    text={aquascape.likesCount}
                                    color={colors.WHITE}
                                />
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

                .top-section :global(.${ActionButtons.classes.root}) {
                    margin-top: ${spaces.s12};
                    margin-left: -${spaces.s8};
                }

                @media ${media.up('medium')} {
                    .top-section {
                        flex-direction: row;
                        justify-content: space-between;
                    }

                    .top-section :global(.${ActionButtons.classes.root}) {
                        margin: -${spaces.s8} -${spaces.s8} 0 0;
                    }
                }
            `}</style>
        </>
    )
}

export default HeroSection
