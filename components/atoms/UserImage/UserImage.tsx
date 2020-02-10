import React from 'react'
import classnames from 'classnames'

import {colors, typography} from 'styles'

const classes = {
    root: 'userImage',
}

export enum UserImageSize {
    s24,
    s36,
    s90,
    s148,
}

export enum UserImageVariant {
    DEFAULT,
    BORDER,
}

interface Props {
    image?: string | null
    size?: UserImageSize
    variant?: UserImageVariant
    placeholder?: string
}

const sizeMapping = {
    [UserImageSize.s24]: '24px',
    [UserImageSize.s36]: '36px',
    [UserImageSize.s90]: '90px',
    [UserImageSize.s148]: '148px',
}

const borderSizeMapping = {
    [UserImageSize.s24]: '1px',
    [UserImageSize.s36]: '1px',
    [UserImageSize.s90]: '3px',
    [UserImageSize.s148]: '3px',
}

const placeholderFontSizeMapping = {
    [UserImageSize.s24]: typography.fontSize.fs14,
    [UserImageSize.s36]: typography.fontSize.fs20,
    [UserImageSize.s90]: typography.fontSize.fs38,
    [UserImageSize.s148]: typography.fontSize.fs51,
}

type UserImageType = React.FunctionComponent<Props> & {
    classes: typeof classes
}

const PLACEHOLDER = '/static/placeholders/user.png'

const UserImage: UserImageType = ({
    image,
    size = UserImageSize.s24,
    variant = UserImageVariant.DEFAULT,
    placeholder,
    children,
}) => (
    <>
        <div
            className={classnames(classes.root, {
                border: variant === UserImageVariant.BORDER,
            })}
        >
            {image && <img className="image" src={image || PLACEHOLDER} alt="Aquascaper" />}
            {!image && placeholder && <div className="placeholder">{placeholder}</div>}
            {!image && !placeholder && <img className="image" src={PLACEHOLDER} alt="Aquascaper" />}
            {children}
        </div>

        <style jsx>{`
            .${classes.root} {
                position: relative;
                width: ${sizeMapping[size]};
                height: ${sizeMapping[size]};

                display: flex;
                justify-content: center;
                align-items: center;

                background-color: ${colors.SHADE_MIDDLE};
                border-radius: 50%;
                overflow: hidden;
            }

            .image {
                position: absolute;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .placeholder {
                margin-top: 2px;

                color: ${colors.WHITE};
                font-size: ${placeholderFontSizeMapping[size]};
                font-family: ${typography.fontFamily.PRIMARY};
                font-weight: ${typography.fontWeight.bold};
                text-transform: lowercase;
            }

            .border {
                border: ${borderSizeMapping[size]} solid ${colors.WHITE};
            }
        `}</style>
    </>
)

UserImage.classes = classes

export default UserImage
