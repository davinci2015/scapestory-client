import React from 'react'
import {Button, Icon, FormattedMessage, Loader} from 'components/atoms'
import {colors} from 'styles'

interface Props {
    onClick: VoidFunction
    loading: boolean
}

const AddAquascapeButton: React.FunctionComponent<Props> = ({loading, onClick}) => (
    <Button
        disabled={loading}
        dimensions="small"
        onClick={onClick}
        leftIcon={
            loading ? (
                <Loader />
            ) : (
                <Icon d={Icon.ADD_FULL} viewBox="0 0 22 22" color={colors.WHITE} />
            )
        }
    >
        <FormattedMessage id="navigation_add_your_aquarium" defaultMessage="Add your aquarium" />
    </Button>
)

export default AddAquascapeButton
