import React from 'react'
import Modal from 'components/molecules/Modal'
import {spaces, media, colors, typography} from 'styles'
import {Plant, PlantGrowthSpeed, PlantPosition} from 'graphql/generated/mutations'
import {Icon, Paragraph, FormattedMessage} from 'components/atoms'
import {PlantDifficulty} from 'graphql/generated/types'
import {PlantLuminosity} from 'graphql/generated/queries'

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

const plantDifficultyMessage = {
    [PlantDifficulty.Easy]: {
        id: 'plant_modal.difficulty_easy',
        defaultMessage: 'Easy',
    },
    [PlantDifficulty.Medium]: {
        id: 'plant_modal.difficulty_easy',
        defaultMessage: 'Medium',
    },
    [PlantDifficulty.Advanced]: {
        id: 'plant_modal.difficulty_easy',
        defaultMessage: 'Advanced',
    },
}

const plantGrowthSpeedMessage = {
    [PlantGrowthSpeed.Slow]: {
        id: 'plant_modal.growth_speed_slow',
        defaultMessage: 'Slow',
    },
    [PlantGrowthSpeed.Medium]: {
        id: 'plant_modal.growth_speed_medium',
        defaultMessage: 'Medium',
    },
    [PlantGrowthSpeed.High]: {
        id: 'plant_modal.growth_speed_high',
        defaultMessage: 'High',
    },
}

const plantLuminosityMessage = {
    [PlantLuminosity.Low]: {
        id: 'plant_modal.luminosity_low',
        defaultMessage: 'Slow',
    },
    [PlantLuminosity.Medium]: {
        id: 'plant_modal.luminosity_medium',
        defaultMessage: 'Medium',
    },
    [PlantLuminosity.High]: {
        id: 'plant_modal.luminosity_high',
        defaultMessage: 'High',
    },
}

const plantPositionMessage = {
    [PlantPosition.Front]: {
        id: 'plant_modal.position_front',
        defaultMessage: 'Foreground',
    },
    [PlantPosition.Middle]: {
        id: 'plant_modal.position_middle',
        defaultMessage: 'Middleground',
    },
    [PlantPosition.Back]: {
        id: 'plant_modal.position_back',
        defaultMessage: 'Background',
    },
}

const getPlantPositionMessage = (position: PlantPosition) =>
    plantPositionMessage[position] || plantPositionMessage[PlantPosition.Middle]

const getPlantLuminosityMessage = (luminosity: PlantLuminosity) =>
    plantLuminosityMessage[luminosity] || plantLuminosityMessage[PlantLuminosity.Low]

const getPlantGrowthSpeedMessage = (speed: PlantGrowthSpeed) =>
    plantGrowthSpeedMessage[speed] || plantGrowthSpeedMessage[PlantGrowthSpeed.Medium]

const getPlantDifficultyMessage = (difficulty: PlantDifficulty) =>
    plantDifficultyMessage[difficulty] || plantDifficultyMessage[PlantDifficulty.Easy]

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
                        {plant.description && (
                            <Paragraph className="description">{plant.description}</Paragraph>
                        )}
                        <table>
                            <tbody>
                                {plant.origin && (
                                    <tr>
                                        <td className="cell cell-description">
                                            <FormattedMessage
                                                id="plant_modal.origin"
                                                defaultMessage="Origin:"
                                            />
                                        </td>
                                        <td className="cell">
                                            <a
                                                className="origin-link"
                                                href={`https://www.google.com/maps/place/${plant.origin}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {plant.origin}
                                            </a>
                                        </td>
                                    </tr>
                                )}
                                {plant.growthSpeed && (
                                    <tr>
                                        <td className="cell cell-description">
                                            <FormattedMessage
                                                id="plant_modal.growth_speed"
                                                defaultMessage="Growth speed:"
                                            />
                                        </td>
                                        <td className="cell">
                                            <FormattedMessage
                                                {...getPlantGrowthSpeedMessage(plant.growthSpeed)}
                                            />
                                        </td>
                                    </tr>
                                )}
                                {plant.difficulty && (
                                    <tr>
                                        <td className="cell cell-description">
                                            <FormattedMessage
                                                id="plant_modal.difficulty"
                                                defaultMessage="Difficulty:"
                                            />
                                        </td>
                                        <td className="cell cell-difficulty">
                                            <FormattedMessage
                                                {...getPlantDifficultyMessage(plant.difficulty)}
                                            />
                                        </td>
                                    </tr>
                                )}
                                {plant.luminosity && (
                                    <tr>
                                        <td className="cell cell-description">
                                            <FormattedMessage
                                                id="plant_modal.light_demand"
                                                defaultMessage="Light demand:"
                                            />
                                        </td>
                                        <td className="cell">
                                            <FormattedMessage
                                                {...getPlantLuminosityMessage(plant.luminosity)}
                                            />
                                        </td>
                                    </tr>
                                )}
                                {plant.minHeight && plant.maxHeight && (
                                    <tr>
                                        <td className="cell cell-description">
                                            <FormattedMessage
                                                id="plant_modal.height"
                                                defaultMessage="Height (cm):"
                                            />
                                        </td>
                                        <td className="cell">
                                            {plant.minHeight} - {plant.maxHeight}+
                                        </td>
                                    </tr>
                                )}
                                {plant.position && (
                                    <tr>
                                        <td className="cell cell-description">
                                            <FormattedMessage
                                                id="plant_modal.tank_position"
                                                defaultMessage="Tank position:"
                                            />
                                        </td>
                                        <td className="cell">
                                            <FormattedMessage
                                                {...getPlantPositionMessage(plant.position)}
                                            />
                                        </td>
                                    </tr>
                                )}
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

            .body :global(.description) {
                margin-bottom: ${spaces.s24};
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
                width: 100%;
                border-collapse: collapse;
            }

            table tr:not(:last-of-type) {
                border-bottom: 1px solid ${colors.SHADE_LIGHT};
            }

            table .cell {
                padding-top: ${spaces.s16};
                padding-bottom: ${spaces.s16};
            }

            table .cell-description {
                font-weight: ${typography.fontWeight.bold};
                padding-right: ${spaces.s18};
            }

            table .cell-difficulty {
                padding-left: ${spaces.s20};
                position: relative;
            }

            table .cell .origin-link {
                color: ${colors.BLACK};
                transition: color 120ms ease-in-out;
            }

            table .cell .origin-link:hover {
                color: ${colors.PRIMARY};
            }

            table .cell-difficulty::after {
                position: absolute;
                content: '';

                top: 19px;
                width: ${spaces.s12};
                height: ${spaces.s12};
                left: 0;

                border-radius: 50%;
                background-color: ${plantDifficultyColor[plant.difficulty || PlantDifficulty.Easy]};
            }
        `}</style>
    </>
)

export default PlantModal
