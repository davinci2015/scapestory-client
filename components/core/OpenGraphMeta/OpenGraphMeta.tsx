import React from 'react'
import Head from 'next/head'

interface Props {
    url: string
    type?: string
    title: string
    description: string
    image?: string
}

const OpenGraphMeta: React.FunctionComponent<Props> = ({
    description,
    image,
    title,
    type = 'website',
    url,
}) => {
    return (
        <Head>
            <meta property="og:url" content={url} />
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
        </Head>
    )
}

export default OpenGraphMeta
