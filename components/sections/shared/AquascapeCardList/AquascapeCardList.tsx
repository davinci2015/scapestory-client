import React from 'react'

import {FormattedMessage, LoadMoreButton} from 'components/atoms'
import {spaces, media} from 'styles'
import {AquascapeCard} from 'components/molecules'

interface Props {
    children: React.ReactNode
    title: React.ReactNode
    loadMore?: VoidFunction
}

const classes = {
    root: 'card-section',
    title: 'card-section__title',
}

type AquascapeCardListType = React.FunctionComponent<Props> & {
    classes: typeof classes
}

const AquascapeCardList: AquascapeCardListType = ({children, loadMore, title}) => (
    <>
        <div className="card-section">
            <div className="card-section__title">{title}</div>
            {children}
            {loadMore && (
                <div className="load-more">
                    <LoadMoreButton
                        onClick={loadMore}
                        text={
                            <FormattedMessage
                                id="card_list.load_more"
                                defaultMessage="Load more aquascapes"
                            />
                        }
                    />
                </div>
            )}
        </div>
        <style jsx>{`
            .card-section :global(.${AquascapeCard.classes.root}) {
                margin: ${spaces.s16} 0;
            }

            .card-section__title {
                margin-bottom: ${spaces.s48};
            }

            .load-more {
                margin-top: ${spaces.s60};
                display: flex;
                justify-content: center;
            }

            @media ${media.up('medium')} {
                .load-more {
                    margin-top: ${spaces.s90};
                }
            }
        `}</style>
    </>
)

AquascapeCardList.classes = classes

export default AquascapeCardList
