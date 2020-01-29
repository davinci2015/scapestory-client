import React from 'react'
import Head from 'next/head'

import withAuth from 'hocs/withAuth'
import ModalProvider from 'providers/ModalProvider'
import NavigationContainer from 'containers/NavigationContainer'
import FooterContainer from 'containers/FooterContainer'
import ProfileEditContainer from 'containers/ProfileEditContainer'
import config from 'config'

const UserProfileEdit = () => (
    <>
        <Head>
            <title>{config.APP_NAME}</title>
        </Head>
        <ModalProvider>
            <NavigationContainer />
            <ProfileEditContainer />
            <FooterContainer />
        </ModalProvider>
    </>
)

export default withAuth(UserProfileEdit)
