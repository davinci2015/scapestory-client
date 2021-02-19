import React from 'react'
import {ApolloClient, NormalizedCacheObject} from 'apollo-boost'
import App from 'next/app'
import {ApolloProvider} from 'react-apollo'
import {IntlProvider} from 'react-intl'
import {ToastContainer} from 'react-toastify'
import * as Sentry from '@sentry/react'
import {Integrations} from '@sentry/tracing'
import {clearAllBodyScrollLocks} from 'body-scroll-lock'

import {GlobalStyles} from 'components/core'
import withApollo from 'lib/withApollo'

interface Props {
    apollo: ApolloClient<NormalizedCacheObject>
}

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
})

class MyApp extends App<Props> {
    componentDidMount() {
        clearAllBodyScrollLocks()
    }

    render() {
        const {Component, apollo, pageProps} = this.props

        return (
            <IntlProvider locale="en">
                <GlobalStyles />
                <ApolloProvider client={apollo}>
                    <Component {...pageProps} />
                    <ToastContainer position="bottom-right" />
                </ApolloProvider>
            </IntlProvider>
        )
    }
}

export default withApollo(MyApp)
