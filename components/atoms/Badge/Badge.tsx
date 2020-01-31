import React from 'react'
import {spaces, colors, typography} from 'styles'

interface Props {
    children?: React.ReactNode
    icon: React.ReactNode | string
    background?: 'plain' | 'gradient'
}

const backgroundMapping = {
    plain: colors.SHADE_MIDDLE,
    gradient: `background-image: linear-gradient(to bottom, ${colors.SECONDARY}, ${colors.SECONDARY_DARK})`,
}

const Badge = ({background = 'plain', children, icon}: Props) => (
    <>
        <div className="badge">
            <div className="badge-icon">{icon}</div>
            {children}
        </div>
        <style jsx>{`
            .badge {
                display: flex;
                align-items: center;
            }

            .badge-icon {
                display: flex;
                align-items: center;
                justify-content: center;

                font-size: ${typography.fontSize.fs20};
                font-weight: ${typography.fontWeight.bold};
                color: ${colors.WHITE};
                text-transform: lowercase;

                margin-right: ${spaces.s18};
                height: ${spaces.s36};
                width: ${spaces.s36};

                border-radius: 50%;

                background: ${backgroundMapping[background]};
            }
        `}</style>
    </>
)

export default Badge
