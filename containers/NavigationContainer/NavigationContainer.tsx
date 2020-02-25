import React, {useContext, useCallback, useEffect} from 'react'
import {useQuery} from 'react-apollo'

import {Navigation} from 'components/molecules'
import {ModalContext} from 'providers/ModalProvider'
import {AuthContext} from 'providers/AuthenticationProvider'
import useCreateAquascape from 'hooks/useCreateAquascape'
import {UNREAD_NOTIFICATIONS_COUNT} from './queries'
import {UnreadNotificationsCountQuery} from 'graphql/generated/queries'

const NavigationContainer = () => {
    const {openModal} = useContext(ModalContext)
    const {isAuthenticated, user} = useContext(AuthContext)
    const onCreateAquascape = useCreateAquascape()

    const openLoginModal = useCallback(() => openModal('login'), [])
    const openRegisterModal = useCallback(() => openModal('register'), [])
    const {data, refetch} = useQuery<UnreadNotificationsCountQuery>(UNREAD_NOTIFICATIONS_COUNT, {
        fetchPolicy: 'cache-and-network',
    })

    useEffect(() => {
        if (isAuthenticated) refetch()
    }, [isAuthenticated])

    return (
        <Navigation
            user={user}
            isAuthenticated={isAuthenticated}
            openLoginModal={openLoginModal}
            openRegisterModal={openRegisterModal}
            onCreateAquascape={onCreateAquascape}
            unreadNotificationsCount={data ? data.unreadNotificationsCount : 0}
        />
    )
}

export default NavigationContainer
