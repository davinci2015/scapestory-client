const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const production = process.env.NODE_ENV === 'production'
const app = next({dev})
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const port = process.env.PORT || 3000
    const server = express()

    if (production) {
        // Force SSL
        server.use((req, res, next) => {
            if (req.headers['x-forwarded-proto'] !== 'https') {
                res.redirect(status, 'https://' + req.hostname + req.originalUrl)
            } else {
                next()
            }
        })
    }

    server.get('*', (req, res) => handle(req, res))

    server.listen(port, error => {
        if (error) throw error
        console.log(`Listening on port ${port}`)
    })
})
