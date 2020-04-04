import React from 'react'

import {breakpoints, spaces, zIndex} from 'styles'
import {Hide} from 'components/core'
import {pxToNumber} from 'utils/converter'
import {AddAquascapeButton} from 'components/molecules'

interface Props {
    onCreateAquascape: VoidFunction
    loading: boolean
    bottom?: string
}

const FixedButton = ({bottom = spaces.s12, onCreateAquascape, loading}: Props) => (
    <>
        <Hide after={pxToNumber(breakpoints.small)}>
            <div className="fixed-button">
                <AddAquascapeButton loading={loading} onClick={onCreateAquascape} />
            </div>
        </Hide>

        <style jsx>{`
            .fixed-button {
                position: fixed;
                bottom: ${bottom};
                left: 50%;

                z-index: ${zIndex.LOW};
                transform: translateZ(0) translateX(-50%);
                -webkit-transform: translateZ(0) translateX(-50%);
            }
        `}</style>
    </>
)

export default FixedButton
