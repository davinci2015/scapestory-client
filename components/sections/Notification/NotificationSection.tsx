import React from 'react'

import {spaces, media} from 'styles'

interface Props {}

const NotificationSection: React.FunctionComponent<Props> = ({children}) => (
    <>
        <div className="section">{children}</div>
        <style jsx>{`
            .section {
                padding: ${spaces.s60} 0;
            }

            @media ${media.up('medium')} {
                .section {
                    padding: ${spaces.s90} 0;
                }
            }
        `}</style>
    </>
)

export default NotificationSection
