import React from 'react'

import {FormattedMessage} from 'components/atoms'
import {EquipmentCard} from 'components/molecules'

interface Props {}

const SubstratesCard: React.FunctionComponent<Props> = ({children}) => (
    <EquipmentCard
        title={<FormattedMessage id="aquascape.equipment.substrate" defaultMessage="Substrate" />}
        image={<img src="/static/equipment/substrate.jpg" alt="Aquarium substrate" />}
    >
        {children}
    </EquipmentCard>
)

export default SubstratesCard
