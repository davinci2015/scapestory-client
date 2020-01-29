import React from 'react'
import Head from 'next/head'

import NavigationContainer from 'containers/NavigationContainer'
import FooterContainer from 'containers/FooterContainer'
import AquascapeDetailsContainer from 'containers/AquascapeDetailsContainer'
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
                <link href="/static/image-gallery.css" rel="stylesheet" />
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
