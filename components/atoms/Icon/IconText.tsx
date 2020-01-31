import React from 'react'
import {spaces, typography} from 'styles'
import {Icon} from 'components/atoms'

interface Props {
    icon: string
    text: React.ReactNode
    size?: 'default' | 'small'
    color?: string
}

const classes = {
    root: 'icon-text',
}

const iconSizeMapping = {
    default: 20,
    small: 14,
}

const fontSizeMapping = {
    default: typography.fontSize.fs16,
    small: typography.fontSize.fs13,
}

const IconText = ({color, icon, size = 'default', text}: Props) => (
    <div className={classes.root}>
        <Icon d={icon} color={color} size={iconSizeMapping[size]} />
        <p className="paragraph">{text}</p>

        <style jsx>{`
            .icon-text {
                display: inline-flex;
                align-items: center;
            }

            .paragraph {
                margin: 0;

                font-size: ${fontSizeMapping[size]};
                font-weight: ${typography.fontWeight.semibold};
                color: ${color};
            }

            .icon-text :global(svg) {
                margin-right: ${size === 'small' ? spaces.s6 : spaces.s16};
            }
        `}</style>
    </div>
)

IconText.classes = classes

export default IconText
