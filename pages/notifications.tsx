import React from 'react'
import Head from 'next/head'

import NavigationContainer from 'views/NavigationContainer'
import FooterContainer from 'views/FooterContainer'
import NotificationsContainer from 'views/NotificationsContainer'
import withAuth from 'hocs/withAuth'
import ModalProvider from 'providers/ModalProvider'
import config from 'config'
import useLogPageView from 'hooks/analytics'

const Index = () => {
    useLogPageView()

    return (
        <>
            <Head>
                <title>{config.APP_NAME} - Notifications</title>
            </Head>
            <ModalProvider>
                <NavigationContainer />
                <NotificationsContainer />
                <FooterContainer />
            </ModalProvider>
        </>
    )
}

export default withAuth(Index)
