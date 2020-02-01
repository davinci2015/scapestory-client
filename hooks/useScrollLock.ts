import {useEffect, createRef} from 'react'
import {disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks} from 'body-scroll-lock'

const useScrollLock = (isOpen: boolean) => {
    const targetRef = createRef<any>()

    useEffect(() => {
        if (targetRef.current) {
            isOpen ? disableBodyScroll(targetRef.current) : enableBodyScroll(targetRef.current)
        }

        return () => clearAllBodyScrollLocks()
    }, [])

    return targetRef
}

export default useScrollLock
