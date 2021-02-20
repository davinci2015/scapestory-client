import React from 'react'

import {PlantModal} from 'components/molecules'
import {useQuery} from 'react-apollo'
import {PLANT_BY_ID} from './queries'

interface Props {
    plantId: number
    onClose: VoidFunction
}

const PlantModalContainer: React.FunctionComponent<Props> = ({onClose, plantId}) => {
    const {data, error, loading} = useQuery(PLANT_BY_ID, {
        variables: {id: plantId},
    })

    if (error) return null
    if (loading || !data) return null

    return <PlantModal isOpen onClose={onClose} plant={data.plant} />
}

export default PlantModalContainer
