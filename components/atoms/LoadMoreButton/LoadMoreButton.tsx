import React from 'react'
import {Icon} from 'components/atoms'
import {colors, spaces, typography} from 'styles'

interface Props {
    onClick: VoidFunction
    text: React.ReactNode
}

const LoadMoreButton: React.FunctionComponent<Props> = ({onClick, text}) => (
    <>
        <button className="load-more-button" onClick={onClick}>
            <span>{text}</span>
            <Icon d={Icon.ARROW_DOWN_FULL} color={colors.PRIMARY} />
        </button>

        <style jsx>{`
            .load-more-button {
                display: flex;
                align-items: center;
                cursor: pointer;
                outline: 0;
                border: 0;
                background: transparent;
            }

            .load-more-button :global(svg) {
                margin-left: ${spaces.s12};
            }

            .load-more-button > span {
                font-size: ${typography.fontSize.fs20};
                font-weight: ${typography.fontWeight.bold};
                color: ${colors.PRIMARY};
            }
        `}</style>
    </>
)

export default LoadMoreButton
