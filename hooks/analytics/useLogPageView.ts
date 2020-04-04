import ReactGA from 'react-ga'
import {useEffect} from 'react'
import {isProduction} from 'utils/general'
import {initializeAnalytics} from 'utils/analytics'

const useLogPageView = () => {
    useEffect(() => {
        if (!isProduction()) return

        initializeAnalytics()

        ReactGA.set({page: window.location.pathname})
        ReactGA.pageview(window.location.pathname)
    }, [])
}

export default useLogPageView
