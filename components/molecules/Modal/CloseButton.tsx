import React from 'react'
import {Icon} from 'components/atoms'
import {colors, spaces} from 'styles'

interface Props {
    onClick: VoidFunction
}

const CloseButton: React.FunctionComponent<Props> = ({onClick}) => (
    <>
        <a onClick={onClick} className="close-button">
            <Icon d={Icon.CLOSE} color={colors.DARK_GRAY} size={26} />
        </a>
        <style jsx>{`
            .close-button {
                cursor: pointer;
                position: absolute;
                top: ${spaces.s18};
                right: ${spaces.s18};
                padding: ${spaces.s6};
            }
        `}</style>
    </>
)

export default CloseButton
