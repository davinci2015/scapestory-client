import React from 'react'
import Modal from 'components/molecules/Modal'
import {spaces, media, colors, typography} from 'styles'
import {Plant} from 'graphql/generated/mutations'
import {Icon, Paragraph} from 'components/atoms'
import {PlantDifficulty} from 'graphql/generated/types'

interface Props {
    plant: Plant
    isOpen: boolean
    onClose: VoidFunction
}

const plantDifficultyColor = {
    [PlantDifficulty.Easy]: colors.PRIMARY,
    [PlantDifficulty.Medium]: colors.WARNING,
    [PlantDifficulty.Advanced]: colors.SECONDARY,
}

const PlantModal: React.FunctionComponent<Props> = ({isOpen, onClose, plant}) => (
    <>
        <Modal isOpen={isOpen} shouldCloseOnEsc>
            <Modal.Content isOpen={isOpen}>
                <div className="plant-modal">
                    <div className="header">
                        <Modal.CloseButton onClick={onClose} />
                        <div className="title-icon">
                            <Icon
                                d={Icon.PLANT}
                                color={colors.WHITE}
                                size={48}
                                viewBox="0 0 48 48"
                            />
                        </div>
                        <Paragraph type="s3" className="title">
                            {plant.name}
                        </Paragraph>
                    </div>
                    <div className="body">
                        <Paragraph className="description">{plant.description}</Paragraph>
                        <table>
                            <tbody>
                                <tr>
                                    <td className="cell cell-description">Origin:</td>
                                    <td className="cell">{plant.origin}</td>
                                </tr>
                                <tr>
                                    <td className="cell cell-description">Growth speed:</td>
                                    <td className="cell">{plant.growthSpeed}</td>
                                </tr>
                                <tr>
                                    <td className="cell cell-description">Difficulty:</td>
                                    <td className="cell">{plant.difficulty}</td>
                                </tr>
                                <tr>
                                    <td className="cell cell-description">Light demand:</td>
                                    <td className="cell">{plant.luminosity}</td>
                                </tr>
                                <tr>
                                    <td className="cell cell-description">Height:</td>
                                    <td className="cell">
                                        {plant.minHeight} - {plant.maxHeight}+
                                    </td>
                                </tr>
                                <tr>
                                    <td className="cell cell-description">Tank position:</td>
                                    <td className="cell">{plant.position}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal.Content>
        </Modal>
        <style jsx>{`
            .plant-modal {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: ${spaces.s16} ${spaces.s24};
                width: 100vw;
            }

            @media ${media.up('small')} {
                .plant-modal {
                    width: 480px;
                    padding: ${spaces.s16} ${spaces.s36};
                }
            }

            .header {
                display: flex;
                align-items: center;
                padding-right: ${spaces.s24};
            }

            .header :global(.title) {
                font-weight: ${typography.fontWeight.bold};
            }

            .body {
                margin-top: ${spaces.s30};
            }

            .title-icon {
                width: ${spaces.s48};
                height: ${spaces.s48};
                margin-right: ${spaces.s16};

                border-radius: 50%;
                background-color: ${plantDifficultyColor[plant.difficulty || PlantDifficulty.Easy]};
            }

            table {
                margin-top: ${spaces.s24};
                border-collapse: collapse;
            }

            table tr:not(:last-of-type) {
                border-bottom: 1px solid ${colors.SHADE_LIGHT};
            }

            table .cell {
                padding-top: ${spaces.s8};
                padding-bottom: ${spaces.s8};
            }

            table .cell-description {
                font-weight: ${typography.fontWeight.bold};
                padding-right: ${spaces.s36};
            }
        `}</style>
    </>
)

export default PlantModal
