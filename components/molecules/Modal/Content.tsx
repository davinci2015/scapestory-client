import React from 'react'
import {media, colors, spaces} from 'styles'
import useScrollLock from 'hooks/useScrollLock'

interface Props {
    isOpen: boolean
}

const Content: React.FunctionComponent<Props> = ({children, isOpen}) => {
    const targetRef = useScrollLock(isOpen)

    return (
        <>
            <div className="modal__content" ref={targetRef}>
                {children}
            </div>

            <style jsx>{`
                :global(.modal__content) {
                    position: relative;
                    max-height: 100%;

                    background: ${colors.WHITE};
                    overflow-y: auto;
                    overflow-x: hidden;
                }

                @media ${media.up('small')} {
                    :global(.modal__content) {
                        position: relative;
                        margin: 0 ${spaces.s36};
                        max-height: calc(100% - ${spaces.s60});
                        max-width: 730px;

                        border-radius: 16px;
                        background: ${colors.WHITE};
                    }
                }
            `}</style>
        </>
    )
}

export default Content
