import {Request} from 'node-fetch'
import React from 'react'
import initApollo from './apollo'
import Head from 'next/head'
import Cookies from 'universal-cookie'
import {Context, getDataFromTree} from 'react-apollo'
import appConstants from 'appConstants'
import {NormalizedCacheObject, ApolloClient} from 'apollo-boost'
import {NextFunctionComponent, NextContext} from 'next';

const getToken = (req?: Request) => {
    const cookieHeader = req ? req.headers.get('cookie') : undefined
    const cookies = new Cookies(cookieHeader)
    return cookies.get(appConstants.COOKIE_AUTH)
}

const withApolloClient = (App: NextFunctionComponent) => {
    return class Apollo extends React.Component {
        static displayName = 'withApollo(App)'

        apolloClient: ApolloClient<NormalizedCacheObject>

        static async getInitialProps(ctx: NextContext & Context) {
            const {Component, router} = ctx

            let appProps = {}
            if (App && App.getInitialProps) {
                appProps = await App.getInitialProps(ctx)
            }

            // Run all GraphQL queries in the component tree
            // and extract the resulting data
            const apollo = initApollo({}, {
                getToken: () => getToken(ctx.ctx.req)
            })

            if (!process.browser) {
                try {
                    // Run all GraphQL queries
                    await getDataFromTree(
                        // @ts-ignore
                        <App
                            {...appProps}
                            Component={Component}
                            router={router}
                            apolloClient={apollo}
                        />
                    )
                } catch (error) {
                    // Prevent Apollo Client GraphQL errors from crashing SSR.
                    // Handle them in components via the data.error prop:
                    // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
                    console.error('Error while running `getDataFromTree`', error)
                }

                // getDataFromTree does not call componentWillUnmount
                // head side effect therefore need to be cleared manually
                Head.rewind()
            }

            // Extract query data from the Apollo store
            const apolloState = apollo.cache.extract()

            return {
                ...appProps,
                apolloState
            }
        }

        constructor(props: any) {
            super(props)
            this.apolloClient = initApollo(props.apolloState, {getToken})
        }

        render() {
            // @ts-ignore
            return <App {...this.props} apolloClient={this.apolloClient} />
        }
    }
}

export default withApolloClient