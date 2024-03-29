import React from 'react'
import {Link} from 'react-scroll'

import {colors, spaces, typography, media} from 'styles'
import {navigationHeight} from 'components/molecules/Navigation'
import {pxToNumber} from 'utils/converter'

export interface SubNavigationItemProps {
    id: string
    offset?: number
}

const SUBNAVIGATION_HEIGHT = '72px'

const DEFAULT_OFFSET = -(pxToNumber(SUBNAVIGATION_HEIGHT) + pxToNumber(navigationHeight.SLIM))

const Item: React.FunctionComponent<SubNavigationItemProps> = ({children, id, offset = 0}) => (
    <>
        <li>
            <Link
                activeClass="active"
                to={id}
                spy
                smooth
                duration={500}
                offset={offset + DEFAULT_OFFSET}
            >
                {children}
            </Link>
        </li>

        <style jsx>{`
            li {
                cursor: pointer;
                position: relative;
                margin: 0 ${spaces.s24};
                font-size: ${typography.fontSize.fs16};
                font-weight: ${typography.fontWeight.extraBold};
                color: ${colors.SHADE_DEEP};
                transition: color 100ms linear;
                fill: ${colors.SHADE_DEEP};
            }

            li :global(.active) {
                color: ${colors.PRIMARY};
                fill: ${colors.PRIMARY};
            }

            li:hover {
                color: ${colors.PRIMARY};
            }

            @media ${media.up('small')} {
                li::after {
                    content: '';
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    background-color: ${colors.DARK_GRAY};
                    right: -${spaces.s24};
                    top: calc(50% - 2px);
                }
            }
        `}</style>
    </>
)

export {Item}
