import React from 'react'
import typography from 'styles/typography'
import colors from 'styles/colors'

const GlobalStyles = () => (
    <style jsx global>{`
        * {
            box-sizing: border-box;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        body {
            font-family: ${typography.fontFamily.PRIMARY};
            font-size: ${typography.fontSize.fs16};
            background-color: ${colors.BG};
        }

        html,
        body {
            height: 100%;
        }

        #__next {
            display: flex;
            flex-direction: column;
            height: 100%;
        }
    `}</style>
)

export default GlobalStyles
