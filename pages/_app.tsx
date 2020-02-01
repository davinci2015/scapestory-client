import React from 'react'
import {ApolloClient, NormalizedCacheObject} from 'apollo-boost'
import App from 'next/app'
import {ApolloProvider} from 'react-apollo'
import {IntlProvider} from 'react-intl'
import {ToastContainer} from 'react-toastify'
import {GlobalStyles} from 'components/core'
import withApollo from 'lib/withApollo'
import {clearAllBodyScrollLocks} from 'body-scroll-lock'

interface Props {
    apollo: ApolloClient<NormalizedCacheObject>
}

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
