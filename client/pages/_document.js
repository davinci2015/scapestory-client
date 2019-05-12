import React from 'react'
import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta charSet="utf-8"/>
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                    />
                    <link
                        rel='stylesheet'
                        href='https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css'
                    />
                    <link href="https://fonts.googleapis.com/css?family=Playfair+Display" rel="stylesheet"/>
                    <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet"/>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument