import React, {useContext} from 'react'

import FixedButton from 'components/sections/Home/FixedButton'
import useCreateAquascape from 'hooks/useCreateAquascape'
import {AuthContext} from 'providers/AuthenticationProvider'

const AddAquascapeContainer = () => {
    const onCreateAquascape = useCreateAquascape()
    const {user} = useContext(AuthContext)

    const shouldDisplayButton = !user || !user.aquascapes.count

    if (!shouldDisplayButton) return null

    return <FixedButton onCreateAquascape={onCreateAquascape} />
}

export default AddAquascapeContainer
