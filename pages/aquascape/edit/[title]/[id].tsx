import React from 'react'
import Head from 'next/head'

import NavigationContainer from 'containers/NavigationContainer'
import FooterContainer from 'containers/FooterContainer'
import AquascapeDetailsEditContainer from 'containers/AquascapeDetailsEditContainer'
import withAuth from 'hocs/withAuth'
import ModalProvider from 'providers/ModalProvider'
import config from 'config'

const AquascapeDetails = () => (
    <>
        <Head>
            <title>{config.APP_NAME}</title>
        </Head>
        <ModalProvider>
            <NavigationContainer />
            <AquascapeDetailsEditContainer />
            <FooterContainer />
        </ModalProvider>
    </>
)

export default withAuth(AquascapeDetails)
