import React from 'react'

import {spaces, media} from 'styles'
import {LoadMoreButton, FormattedMessage} from 'components/atoms'

interface Props {
    loadMore?: VoidFunction
}

const NotificationSection: React.FunctionComponent<Props> = ({children, loadMore}) => (
    <>
        <div className="section">
            {children}
            {loadMore && (
                <div className="load-more">
                    <LoadMoreButton
                        onClick={loadMore}
                        text={
                            <FormattedMessage
                                id="notifications.load_more"
                                defaultMessage="Load more notifications"
                            />
                        }
                    />
                </div>
            )}
        </div>
        <style jsx>{`
            .section {
                padding: ${spaces.s60} 0;
            }

            .load-more {
                margin-top: ${spaces.s60};
                display: flex;
                justify-content: center;
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
