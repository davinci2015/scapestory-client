import React, {useState} from 'react'

import FloraList from 'components/sections/AquascapeDetails/FloraSection/FloraList'
import {FormattedMessage, Icon} from 'components/atoms'

import {colors} from 'styles'
import {Plant} from 'graphql/generated/types'
import PlantModalContainer from './PlantModalContainer'

interface Props {
    plants: Pick<Plant, 'id' | 'name'>[]
}

const PlantListContainer: React.FunctionComponent<Props> = ({plants}) => {
    const [plantId, setPlantId] = useState<number | null>()

    const openPlantModal = (plantId: number) => setPlantId(plantId)

    const closePlantModal = () => setPlantId(null)

    return (
        <>
            <FloraList
                onItemClick={openPlantModal}
                entities={plants}
                title={
                    <FormattedMessage
                        id="aquascape.flora_and_fauna.plants"
                        defaultMessage="Plants"
                    />
                }
                icon={<Icon d={Icon.PLANT} color={colors.WHITE} size={48} viewBox="0 0 48 48" />}
                noEntityText={
                    <FormattedMessage
                        id="aquascape.flora_and_fauna.no_plants"
                        defaultMessage="No plants added"
                    />
                }
            />

            {plantId && <PlantModalContainer plantId={plantId} onClose={closePlantModal} />}
        </>
    )
}

export default PlantListContainer
