import React from 'react'
import {noop} from 'lodash'

import {spaces, borderRadius, colors} from 'styles'
import {FormattedMessage, Button, Icon} from 'components/atoms'
import {ImageUpload} from 'components/core'

interface Image {
    id: number
    src: string
    alt?: string | null
}

interface Props {
    onImageChange?: (files: FileList | null) => void
    onImageRemove?: (id: number) => void
    images: Image[]
    edit?: boolean
}

const GUTTER = spaces.s16
const ALT_PLACEHOLDER = 'Scapostory post'

const ButtonAddPhoto = ({onClick}: {onClick: (files: FileList | null) => void}) => (
    <ImageUpload
        onChange={onClick}
        render={({openFinder}) => (
            <Button
                onClick={openFinder}
                dimensions="small"
                color="primary"
                leftIcon={<Icon d={Icon.CAMERA} color={colors.WHITE} />}
            >
                <FormattedMessage id="photo_grid.add_photo" defaultMessage="Add photo" />
            </Button>
        )}
    />
)

const ButtonRemovePhoto = ({id, onClick}: {onClick: (id: number) => void; id: number}) => (
    <Button
        onClick={() => onClick(id)}
        dimensions="small"
        color="tertiary"
        leftIcon={<Icon d={Icon.BIN} color={colors.WHITE} />}
    >
        <FormattedMessage id="photo_grid.remove_photo" defaultMessage="Remove" />
    </Button>
)

const PhotoSection: React.FunctionComponent<Props> = ({
    edit,
    images,
    onImageChange = noop,
    onImageRemove = noop,
}) => (
    <>
        <div className="photo-grid">
            <div className="row">
                {images[0] ? (
                    <div className="image image--main">
                        <img src={images[0].src} alt={images[0].alt || ALT_PLACEHOLDER} />
                        {edit && (
                            <div className="btn-wrapper">
                                <ButtonAddPhoto onClick={onImageChange} />
                                <ButtonRemovePhoto id={images[0].id} onClick={onImageRemove} />
                            </div>
                        )}
                    </div>
                ) : (
                    edit && (
                        <div className="image image--main">
                            <div className="btn-wrapper">
                                <ButtonAddPhoto onClick={onImageChange} />
                            </div>
                        </div>
                    )
                )}
                {images[1] ? (
                    <div className="image image--half">
                        <img src={images[1].src} alt={images[1].alt || ALT_PLACEHOLDER} />
                        {edit && (
                            <div className="btn-wrapper">
                                <ButtonRemovePhoto id={images[1].id} onClick={onImageRemove} />
                            </div>
                        )}
                    </div>
                ) : (
                    edit && <div className="image image--half"></div>
                )}
                <div className="column">
                    {images[2] ? (
                        <div className="image">
                            <img src={images[2].src} alt={images[2].alt || ALT_PLACEHOLDER} />
                            {edit && (
                                <div className="btn-wrapper">
                                    <ButtonRemovePhoto id={images[2].id} onClick={onImageRemove} />
                                </div>
                            )}
                        </div>
                    ) : (
                        edit && <div className="image"></div>
                    )}
                    {images[3] ? (
                        <div className="image">
                            <img src={images[3].src} alt={images[3].alt || ALT_PLACEHOLDER} />
                            {edit && (
                                <div className="btn-wrapper">
                                    <ButtonRemovePhoto id={images[3].id} onClick={onImageRemove} />
                                </div>
                            )}
                        </div>
                    ) : (
                        edit && <div className="image"></div>
                    )}
                </div>
            </div>
            <div className="row">
                {images.slice(4).map(image => (
                    <div className="image" key={image.src}>
                        <img src={image.src} alt={image.alt || ALT_PLACEHOLDER} />
                        {edit && (
                            <div className="btn-wrapper">
                                <ButtonRemovePhoto id={image.id} onClick={onImageRemove} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>

        <style jsx>{`
            .photo-grid .btn-wrapper {
                position: absolute;
                display: flex;

                margin-top: ${spaces.s18};
                margin-left: ${spaces.s18};
            }

            .photo-grid .btn-wrapper :global(.${Button.classes.root}) {
                margin-right: ${spaces.s18};
            }

            .row {
                display: flex;
                margin-left: -8px;
            }

            .column {
                width: calc(25% - ${GUTTER});
            }

            .column .image {
                width: 100%;
            }

            .image {
                position: relative;
                width: calc(25% - ${GUTTER});
                height: 221px;
                margin: 8px;

                background-color: ${colors.SHADE_EXTRA_LIGHT};
                border-radius: ${borderRadius.TERTIARY};
            }

            .image.image--main {
                width: calc(50% - ${GUTTER});
                height: 450px;
            }

            .image.image--half {
                height: 450px;
            }

            .image :global(img) {
                position: absolute;
                height: 100%;
                width: 100%;
                object-fit: cover;
                border-radius: ${borderRadius.TERTIARY};
            }
        `}</style>
    </>
)

export default PhotoSection
