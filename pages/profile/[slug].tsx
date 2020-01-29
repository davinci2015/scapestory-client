import React from 'react'
import Head from 'next/head'

import withAuth from 'hocs/withAuth'
import ModalProvider from 'providers/ModalProvider'
import NavigationContainer from 'containers/NavigationContainer'
import FooterContainer from 'containers/FooterContainer'
import ProfileContainer from 'containers/ProfileContainer'
import config from 'config'
import useLogPageView from 'hooks/analytics'

const UserProfile = () => {
    useLogPageView()

    return (
        <>
            <Head>
                <title>{config.APP_NAME}</title>
            </Head>
            <ModalProvider>
                <NavigationContainer />
                <ProfileContainer />
                <FooterContainer />
            </ModalProvider>
        </>
    )
}

export default withAuth(UserProfile)
