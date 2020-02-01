import React from 'react'
import {media, colors} from 'styles'

interface Props {}

const Content: React.FunctionComponent<Props> = ({children}) => (
    <>
        <div className="modal__content">{children}</div>

        <style jsx>{`
            :global(.modal__content) {
                position: relative;
                height: 100%;
                background: ${colors.WHITE};
            }

            @media ${media.up('small')} {
                :global(.modal__content) {
                    position: relative;
                    border-radius: 16px;
                    background: ${colors.WHITE};
                }
            }
        `}</style>
    </>
)

export default Content
