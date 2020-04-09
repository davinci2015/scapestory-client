import React from 'react'
import Head from 'next/head'

import NavigationContainer from 'containers/NavigationContainer'
import FooterContainer from 'containers/FooterContainer'
import HomeContainer from 'containers/Home'
import withAuth from 'hocs/withAuth'
import ModalProvider from 'providers/ModalProvider'
import config from 'config'
import useLogPageView from 'hooks/analytics'

const Index = () => {
    useLogPageView()

    return (
        <>
            <Head>
                <title>{config.APP_NAME} - Only Place For Your Aquarium Or Aquascape</title>
            </Head>
            <ModalProvider>
                <NavigationContainer />
                <HomeContainer />
                <FooterContainer />
            </ModalProvider>
        </>
    )
}

export default withAuth(Index)
