import React from 'react'
import {List, ListItem} from 'components/molecules'

interface EntityType {
    id: number
    name: string
    infoFulfilled?: boolean
}

interface Props {
    onItemClick?: (entityId: number) => void
    title: React.ReactNode
    icon: React.ReactNode
    noEntityText: React.ReactNode
    entities: EntityType[]
}

const FloraList: React.FunctionComponent<Props> = ({
    title,
    icon,
    noEntityText,
    entities = [],
    onItemClick,
}) => (
    <List icon={icon} title={title}>
        {entities.length ? (
            entities.map(entity => (
                <ListItem
                    onClick={
                        entity.infoFulfilled && onItemClick
                            ? () => onItemClick(entity.id)
                            : undefined
                    }
                    key={entity.id}
                >
                    {entity.name}
                </ListItem>
            ))
        ) : (
            <ListItem>{noEntityText}</ListItem>
        )}
    </List>
)

export default FloraList
