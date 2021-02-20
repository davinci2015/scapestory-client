import React from 'react'
import Head from 'next/head'

import NavigationContainer from 'views/NavigationContainer'
import FooterContainer from 'views/FooterContainer'
import AquascapeDetailsContainer from 'views/AquascapeDetailsContainer'
import withAuth from 'hocs/withAuth'
import ModalProvider from 'providers/ModalProvider'
import config from 'config'
import useLogPageView from 'hooks/analytics'

const AquascapeDetails = () => {
    useLogPageView()

    return (
        <>
            <Head>
                <title>{config.APP_NAME}</title>
            </Head>
            <ModalProvider>
                <NavigationContainer />
                <AquascapeDetailsContainer />
                <FooterContainer />
            </ModalProvider>
        </>
    )
}

export default withAuth(AquascapeDetails)
