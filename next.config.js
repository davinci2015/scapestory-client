require('dotenv').config()

module.exports = {
    webpack(config) {
        config.resolve.modules.unshift(__dirname)
        return config
    },
    env: {
        API_URL: process.env.API_URL,
    },
}
