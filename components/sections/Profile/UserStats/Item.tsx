import React from 'react'
import classnames from 'classnames'

import {typography, colors} from 'styles'
import {Paragraph} from 'components/atoms'

interface Props {
    title: React.ReactNode
    value: React.ReactNode
    onClick?: VoidFunction
}

export type ItemType = React.FunctionComponent<Props>

const Item: ItemType = ({onClick, title, value}) => (
    <>
        <div className="item">
            <a
                role="presentation"
                onClick={onClick}
                className={classnames('title', {
                    'title-clickable': !!onClick,
                })}
            >
                <Paragraph as="p" weight="semibold">
                    {title}
                </Paragraph>
            </a>
            <div className="item-number">
                <Paragraph as="span" weight="bold">
                    {value}
                </Paragraph>
            </div>
        </div>

        <style jsx>{`
            .item {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                flex-basis: 30%;
            }

            .item-number :global(.${Paragraph.classes.root}) {
                font-size: ${typography.fontSize.fs20};
            }

            .title-clickable :global(.${Paragraph.classes.root}) {
                cursor: pointer;
                text-decoration: underline;
                transition: color 140ms ease-in-out;
            }

            .title-clickable :global(.${Paragraph.classes.root}):hover {
                color: ${colors.PRIMARY_DARK};
            }
        `}</style>
    </>
)

export default Item
