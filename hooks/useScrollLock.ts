import {useEffect, createRef} from 'react'
import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock'

const useScrollLock = (isOpen: boolean) => {
    const targetRef = createRef<HTMLDivElement>()

    useEffect(() => {
        if (targetRef.current) {
            isOpen ? disableBodyScroll(targetRef.current) : enableBodyScroll(targetRef.current)
        }

        return () => {
            targetRef.current && enableBodyScroll(targetRef.current)
        }
    }, [isOpen])

    return targetRef
}

export default useScrollLock
