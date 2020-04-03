import React from 'react'
import classnames from 'classnames'

import {spaces} from 'styles'
import {Tag, IconText} from 'components/atoms'

interface Props {
    className?: string
}

const BottomSection: React.FunctionComponent<Props> = ({children, className}) => (
    <div className={classnames('section', className)}>
        {children}
        <style jsx>{`
            .section {
                display: flex;
                width: 100%;
                justify-content: space-between;
            }

            .section :global(.${Tag.classes.root}) {
                margin-left: ${spaces.s6};
                margin-right: ${spaces.s6};
            }

            .section :global(.${IconText.classes.root}) {
                margin-left: ${spaces.s12};
                margin-right: ${spaces.s12};
            }
        `}</style>
    </div>
)

const BottomLeft: React.FunctionComponent<Props> = ({children, className}) => (
    <div className={className}>{children}</div>
)

const BottomRight: React.FunctionComponent<Props> = ({children, className}) => (
    <div className={className}>{children}</div>
)

export {BottomSection, BottomLeft, BottomRight}
