import React, {useContext} from 'react'

import FixedButton from 'components/sections/Home/FixedButton'
import useCreateAquascape from 'hooks/useCreateAquascape'
import {AuthContext} from 'providers/AuthenticationProvider'

interface Props {
    bottom?: string
}

const AddAquascapeContainer = ({bottom}: Props) => {
    const {createAquascape, loading} = useCreateAquascape()
    const {user} = useContext(AuthContext)

    const shouldDisplayButton = !user || !user.aquascapes.count

    if (!shouldDisplayButton) return null

    return <FixedButton onCreateAquascape={createAquascape} bottom={bottom} loading={loading} />
}

export default AddAquascapeContainer
