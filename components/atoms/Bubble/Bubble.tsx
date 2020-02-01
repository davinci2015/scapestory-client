import React from 'react'
import {colors} from 'styles'

interface Props {
    size?: string
    opacity?: number
}

const Bubble = ({opacity = 0.05, size = '300px'}: Props) => (
    <div className="bubble">
        <style jsx>{`
            .bubble {
                width: ${size};
                height: ${size};
                border-radius: 50%;
                border: 14px solid ${colors.PRIMARY};
                opacity: ${opacity};
                pointer-events: none;
            }
        `}</style>
    </div>
)

export default Bubble
