import React from 'react'

import {UserImage, FormattedMessage, Icon, Paragraph} from 'components/atoms'
import {UserImageSize, UserImageVariant} from 'components/atoms/UserImage/UserImage'
import {colors, spaces, breakpoints, media} from 'styles'
import {ImageUpload, Hide} from 'components/core'
import {pxToNumber} from 'utils/converter'
import {getImageCharPlaceholder} from 'utils/user'

interface Props {
    username?: string
    image?: string | null
    onChange: (files: FileList | null) => void
}

const EditButton = ({openFinder}: {openFinder: VoidFunction}) => (
    <>
        <button onClick={openFinder} className="button">
            <Icon d={Icon.CAMERA} size={20} color={colors.WHITE} />
            <div className="button-text">
                <Paragraph as="span" type="s2" weight="bold" color={colors.WHITE}>
                    <FormattedMessage
                        id="user_image.change_profile_image"
                        defaultMessage="Change"
                    />
                </Paragraph>
            </div>
        </button>
        <style jsx>{`
            .button {
                position: absolute;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                cursor: pointer;
                background-color: rgba(0, 0, 0, 0.5);
                width: 100%;
                height: 100%;
                border: 0;
            }

            .button-text {
                margin-top: ${spaces.s4};
            }

            @media ${media.up('medium')} {
                .button-text {
                    margin-top: ${spaces.s12};
                }
            }
        `}</style>
    </>
)

const EditableUserImage: React.FunctionComponent<Props> = ({image, onChange, username}) => (
    <ImageUpload
        onChange={onChange}
        render={({openFinder}) => (
            <>
                <Hide upTo={pxToNumber(breakpoints.medium)}>
                    <UserImage
                        image={image}
                        size={UserImageSize.s148}
                        variant={UserImageVariant.BORDER}
                        placeholder={getImageCharPlaceholder(username || '')}
                    >
                        <EditButton openFinder={openFinder} />
                    </UserImage>
                </Hide>
                <Hide after={pxToNumber(breakpoints.medium)}>
                    <UserImage
                        image={image}
                        size={UserImageSize.s90}
                        variant={UserImageVariant.BORDER}
                        placeholder={getImageCharPlaceholder(username || '')}
                    >
                        <EditButton openFinder={openFinder} />
                    </UserImage>
                </Hide>
            </>
        )}
    />
)

export default EditableUserImage
