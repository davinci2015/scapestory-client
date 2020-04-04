import {useContext} from 'react'

import {AuthContext} from 'providers/AuthenticationProvider'
import {ModalContext} from 'providers/ModalProvider'

const useAuthGuard = () => {
    const {isAuthenticated, user} = useContext(AuthContext)
    const {openModal} = useContext(ModalContext)

    return (cb: Function) => (...params: any) => {
        if (!isAuthenticated || !user) return openModal('register')
        cb(...params)
    }
}

export default useAuthGuard
