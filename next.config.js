require('dotenv').config()

module.exports = {
    webpack(config) {
        config.resolve.modules.unshift(__dirname)
        return config
    },
    env: {
        API_URL: process.env.API_URL,
        FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,
        GOOGLE_ANALYTICS_TRACKING_ID: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
    },
}
