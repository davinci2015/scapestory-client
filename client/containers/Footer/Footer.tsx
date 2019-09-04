import React, {useContext} from 'react'

import {ModalContext} from 'context/modal'
import {Footer} from 'components/organisms'

const FooterContainer = () => {
    const {openModal} = useContext(ModalContext)
    
    return (
        <Footer openModal={openModal}/>
    )
}

export default FooterContainer