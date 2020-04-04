import React from 'react'
import {colors, typography} from 'styles'
import UserImage, {UserImageSize, UserImageVariant} from 'components/atoms/UserImage'

const classes = {
    root: 'image-stack',
}

export enum ImageStackSize {
    s24,
    s36,
}

interface Image {
    url?: string | null
    placeholder?: string
}

interface Props {
    images: Image[]
    placeholder?: string
    size?: ImageStackSize
}

const sizeMapping = {
    [ImageStackSize.s24]: '24px',
    [ImageStackSize.s36]: '36px',
}

const imageSizeMapping = {
    [ImageStackSize.s24]: UserImageSize.s24,
    [ImageStackSize.s36]: UserImageSize.s36,
}

const ImageStack = ({images, placeholder, size = ImageStackSize.s36}: Props) => (
    <div className={classes.root}>
        <div className="images">
            {images.map((image, index) => (
                <div
                    key={index}
                    className="image"
                    style={{
                        zIndex: images.length - index,
                    }}
                >
                    <UserImage
                        size={imageSizeMapping[size]}
                        variant={UserImageVariant.BORDER}
                        image={image.url}
                        placeholder={image.placeholder}
                    />
                </div>
            ))}
            {placeholder && <div className="placeholder">{placeholder}</div>}
        </div>
        <style jsx>{`
            .${classes.root} {
                display: flex;
                align-items: center;
                margin-left: 15px;
            }

            .images {
                display: flex;
            }

            .image {
                margin: 0;
                margin-left: -${size === ImageStackSize.s24 ? 10 : 14}px;
            }

            .placeholder {
                display: flex;
                align-items: center;
                justify-content: center;

                margin-left: -${size === ImageStackSize.s24 ? 4 : 8}px;
                width: ${sizeMapping[size]};
                height: ${sizeMapping[size]};

                border-radius: 50%;
                border: 1px solid ${colors.WHITE};
                background: ${colors.DARK_GRAY};

                color: ${colors.WHITE};
                font-weight: ${typography.fontWeight.bold};
                font-size: ${size === ImageStackSize.s24
                    ? typography.fontSize.fs11
                    : typography.fontSize.fs13};
            }
        `}</style>
    </div>
)

ImageStack.classes = classes

export default ImageStack
