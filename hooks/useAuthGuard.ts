import {useContext} from 'react'

import {AuthContext} from 'providers/AuthenticationProvider'
import {ModalContext} from 'providers/ModalProvider'
import {EventArgs} from 'react-ga'
import {trackEvent} from 'utils/analytics'

const useAuthGuard = () => {
    const {isAuthenticated, user} = useContext(AuthContext)
    const {openModal} = useContext(ModalContext)

    return (cb: Function, trackingEvent?: EventArgs) => (...params: any) => {
        if (!isAuthenticated || !user) {
            trackingEvent && trackEvent(trackingEvent)
            return openModal('register')
        }

        cb(...params)
    }
}

export default useAuthGuard
