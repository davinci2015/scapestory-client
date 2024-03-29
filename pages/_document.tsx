import React from 'react'
import Document, {Html, Head, Main, NextScript} from 'next/document'
import flush from 'styled-jsx/server'

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta
                        name="description"
                        content="Add everything about your aquarium in one place. Get inspired for your next aquarium and connect with other aqua lovers."
                    />

                    <meta
                        name="keywords"
                        content="aquarium, aquascape, aquascaper, fishkeeping, aqua, aquascaping, tank, planted tank, planted aquarium, freshwater aquarium"
                    />

                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="57x57"
                        href="/static/favicon/apple-icon-57x57.png"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="60x60"
                        href="/static/favicon/apple-icon-60x60.png"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="72x72"
                        href="/static/favicon/apple-icon-72x72.png"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="76x76"
                        href="/static/favicon/apple-icon-76x76.png"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="114x114"
                        href="/static/favicon/apple-icon-114x114.png"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="120x120"
                        href="/static/favicon/apple-icon-120x120.png"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="144x144"
                        href="/static/favicon/apple-icon-144x144.png"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="152x152"
                        href="/static/favicon/apple-icon-152x152.png"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/static/favicon/apple-icon-180x180.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/static/favicon/favicon-32x32.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="96x96"
                        href="/static/favicon/favicon-96x96.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/static/favicon/favicon-16x16.png"
                    />
                    <meta
                        name="msapplication-TileImage"
                        content="/static/favicon/ms-icon-144x144.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="192x192"
                        href="/static/favicon/android-icon-192x192.png"
                    />
                    <link rel="manifest" href="/static/favicon/manifest.json" />
                    <meta name="msapplication-TileColor" content="#ffffff" />
                    <meta name="theme-color" content="#ffffff" />

                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
                    />
                    <link
                        href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,600,800,900&display=swap&subset=latin-ext"
                        rel="stylesheet"
                    />
                    <link href="/static/toastify.css" rel="stylesheet" />
                    <link href="/static/image-gallery.css" rel="stylesheet" />
                    {flush()}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
