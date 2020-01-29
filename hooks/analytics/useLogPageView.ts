import ReactGA from 'react-ga'
import {useEffect} from 'react'
import {isProduction} from 'utils/general'

let initialized = false

const useLogPageView = () => {
    useEffect(() => {
        if (!isProduction()) return

        if (!initialized) {
            ReactGA.initialize(process.env.GOOGLE_ANALYTICS_TRACKING_ID as string)
            initialized = true
        }

        ReactGA.set({page: window.location.pathname})
        ReactGA.pageview(window.location.pathname)
    }, [])
}

export default useLogPageView
