import React from 'react'
import classnames from 'classnames'

import {zIndex} from 'styles'

interface Props {
    className?: string
}

const TopSection: React.FunctionComponent<Props> = ({children, className}) => (
    <div className={classnames('section', className)}>
        {children}
        <style jsx>{`
            .section {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;

                z-index: ${zIndex.DEFAULT};
            }
        `}</style>
    </div>
)

const TopLeft: React.FunctionComponent<Props> = ({children, className}) => (
    <div className={className}>{children}</div>
)

const TopRight: React.FunctionComponent<Props> = ({children, className}) => (
    <div className={className}>{children}</div>
)

export {TopSection, TopLeft, TopRight}
