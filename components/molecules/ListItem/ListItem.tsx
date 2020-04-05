import React from 'react'
import classnames from 'classnames'

import {spaces, typography, colors, borderRadius} from 'styles'
import {IconButton, Icon} from 'components/atoms'

interface Props {
    children: React.ReactNode
    onClick?: VoidFunction
    onDelete?: ((...args: any[]) => void) | undefined
}

const classes = {
    root: 'list-item',
}

const ListItem = ({children, onClick, onDelete}: Props) => (
    <>
        <a
            className={classnames(classes.root, {
                'list-item-clickable': !!onClick,
            })}
            onClick={onClick}
        >
            <div
                className={classnames('list-item-inner', {
                    'list-item-inner--edit': Boolean(onDelete),
                })}
            >
                {children}

                {onDelete && (
                    <IconButton onClick={onDelete}>
                        <Icon d={Icon.BIN} color={colors.PRIMARY} />
                    </IconButton>
                )}
            </div>
        </a>
        <style jsx>{`
            .list-item {
                display: flex;
                margin: ${spaces.s6} 0 ${spaces.s6} -${spaces.s12};

                font-size: ${typography.fontSize.fs20};
                line-height: ${typography.lineHeight.lh40};

                border-radius: ${borderRadius.TERTIARY};
                transition: background-color 100ms ease-in-out, color 120ms linear;
            }

            .list-item-clickable {
                cursor: pointer;
                text-decoration: underline;
            }

            .list-item-clickable:hover {
                color: ${colors.PRIMARY};
            }

            .list-item-inner {
                display: flex;
                align-items: center;

                padding: ${spaces.s4} ${spaces.s12};
                border-radius: ${borderRadius.TERTIARY};
                transition: background-color 100ms ease-in-out;
            }

            .list-item-inner--edit:hover {
                background-color: ${colors.PRIMARY_LIGHT};
            }

            .list-item-inner :global(.${IconButton.classes.root}) {
                margin-left: ${spaces.s8};
                margin-top: 2px;
            }
        `}</style>
    </>
)

ListItem.classes = classes

export default ListItem
