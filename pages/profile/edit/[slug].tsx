import React from 'react'
import Head from 'next/head'

import withAuth from 'hocs/withAuth'
import ModalProvider from 'providers/ModalProvider'
import NavigationContainer from 'views/NavigationContainer'
import FooterContainer from 'views/FooterContainer'
import ProfileEditContainer from 'views/ProfileEditContainer'
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
