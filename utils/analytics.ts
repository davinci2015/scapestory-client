import ReactGA, {EventArgs} from 'react-ga'

import {isProduction} from './general'
import logger from 'services/logger'

let initialized = false

export const analyticsEvents = {
    share: {
        aquascape: {
            category: 'Share',
            action: 'Clicked share aquascape',
            label: 'Share aquascape on Facebook',
        },
    },
    like: {
        likeUserListOpened: {
            category: 'Like',
            action: 'Opened like user list',
            label: 'Like user list from the details page',
        },
    },
    follow: {
        followerUserListOpened: {
            category: 'Follow',
            action: 'Opened follower user list',
            label: 'Follower user list opened from the user profile page',
        },
        followingUserListOpened: {
            category: 'Follow',
            action: 'Opened following user list',
            label: 'Following user list opened from the user profile page',
        },
    },
    anonymousUser: {
        createAquascape: {
            category: 'Anonymous user',
            action: 'Clicked create aquascape',
            label: 'Anonymous user tried to create an aquascape',
        },
        follow: {
            category: 'Anonymous user',
            action: 'Clicked follow user',
            label: 'Anonymous user tried to follow user',
        },
        aquascapeLike: {
            category: 'Anonymous user',
            action: 'Clicked aquascape like',
            label: 'Anonymous user tried to like an aquascape',
        },
        commentLike: {
            category: 'Anonymous user',
            action: 'Clicked comment like',
            label: 'Anonymous user tried to like a comment',
        },
        comment: {
            category: 'Anonymous user',
            action: 'Clicked add comment',
            label: 'Anonymous user tried to add a comment',
        },
        reply: {
            category: 'Anonymous user',
            action: 'Clicked reply to a comment',
            label: 'Anonymous user tried to reply on a comment',
        },
    },
}

export const initializeAnalytics = () => {
    if (!initialized) {
        ReactGA.initialize(process.env.GOOGLE_ANALYTICS_TRACKING_ID as string)
        initialized = true
    }
}

export const attachTrackEvent = (cb: Function) => (event: EventArgs) => (...params: any) => {
    trackEvent(event)
    cb(...params)
}

export const trackEvent = (event: EventArgs) => {
    if (!isProduction()) {
        return logger.info(event)
    }

    ReactGA.event(event)
}

initializeAnalytics()
