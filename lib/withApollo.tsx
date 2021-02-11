import React from 'react'
import {ApolloClient, ApolloLink} from 'apollo-boost'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {withApollo} from 'next-with-apollo'
import {createUploadLink} from 'apollo-upload-client'
import {onError} from 'apollo-link-error'

import cookie from 'services/cookie'
import appConstants from 'appConstants'
import logger from 'services/logger'
import {toast} from 'react-toastify'
import {FormattedMessage, Paragraph} from 'components/atoms'
import {errorMapper} from 'utils/mappers'
import {colors} from 'styles'

export default withApollo(({headers, initialState}) => {
    const headersMiddleware = new ApolloLink((operation, forward) => {
        const modifiedHeaders: {[key: string]: string} = {}
        const authToken = cookie.getAuthToken(headers)
        const visitorId = cookie.getVisitorId(headers)

        if (authToken) modifiedHeaders[appConstants.HEADER_AUTH_TOKEN] = authToken
        if (visitorId) modifiedHeaders[appConstants.HEADER_VISITOR_ID] = visitorId

        operation.setContext({headers: modifiedHeaders})

        if (forward) return forward(operation)
        return null
    })

    const link = onError(({graphQLErrors, networkError}) => {
        if (graphQLErrors) {
            graphQLErrors.forEach(({message, path}) => {
                // Don't show error toast when user queries "me"
                if (path?.includes('me')) return

                const intlMessage = errorMapper[message] || errorMapper.BAD_REQUEST
                if (intlMessage) {
                    toast.error(
                        <Paragraph color={colors.WHITE}>
                            <FormattedMessage {...intlMessage} />
                        </Paragraph>
                    )
                }
            })
        }

        if (networkError) logger.error(`[Network error]: ${networkError}`)
    })

    const httpLink = createUploadLink({
        uri: process.env.API_URL,
        credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
        fetch: !process.browser ? fetch : undefined,
    })

    return new ApolloClient({
        connectToDevTools: process.browser,
        ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
        link: ApolloLink.from([link, headersMiddleware, httpLink]),
        cache: new InMemoryCache().restore(initialState || {}),
    })
})
