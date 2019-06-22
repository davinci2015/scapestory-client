import React from 'react'
import Head from 'next/head'
import {Context, getDataFromTree} from 'react-apollo'
import {NormalizedCacheObject, ApolloClient} from 'apollo-boost'
import {NextContext} from 'next'
import {AppComponentType} from 'next/app'

import initApollo from './apollo'
import auth from 'utils/auth'

const withApolloClient = (App: AppComponentType) => {
    return class Apollo extends React.Component {
        static displayName = 'withApollo(App)'

        apolloClient: ApolloClient<NormalizedCacheObject>

        static async getInitialProps(ctx: NextContext & Context) {
            const {Component, router} = ctx

            let appProps = {}
            if (App && App.getInitialProps) {
                // @ts-ignore
                appProps = await App.getInitialProps(ctx)
            }

            // Run all GraphQL queries in the component tree
            // and extract the resulting data
            const apollo = initApollo({}, {
                getToken: () => auth.getToken(ctx.ctx.req)
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
            this.apolloClient = initApollo(props.apolloState, {getToken: auth.getToken})
        }

        render() {
            // @ts-ignore
            return <App {...this.props} apolloClient={this.apolloClient} />
        }
    }
}

export default withApolloClient