import React, {ChangeEvent} from 'react'
import {colors, typography, media} from 'styles'

interface Props {
    username: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    placeholder: string
}

const classes = {
    root: 'username-input',
}

type UsernameInputType = React.FunctionComponent<Props> & {
    classes: typeof classes
}

const UsernameInput: UsernameInputType = ({onChange, placeholder, username}) => (
    <>
        <input
            className="username-input"
            onChange={onChange}
            defaultValue={username}
            maxLength={40}
            placeholder={placeholder}
        />
        <style jsx>{`
            .username-input {
                position: relative;
                width: 60%;
                padding-top: 2px;

                color: ${colors.WHITE};
                font-size: ${typography.fontSize.fs20};
                font-weight: ${typography.fontWeight.extraBold};
                font-family: ${typography.fontFamily.PRIMARY};

                background: transparent;
                border: none;
                outline: 0;
                border-bottom: 2px solid ${colors.SHADE_EXTRA_LIGHT};
            }

            @media ${media.up('medium')} {
                .username-input {
                    font-size: ${typography.fontSize.fs28};
                }
            }
        `}</style>
    </>
)

UsernameInput.classes = classes

export default UsernameInput
