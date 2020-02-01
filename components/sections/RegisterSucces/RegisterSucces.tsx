import React from 'react'
import {Paragraph, FormattedMessage, Headline, Button} from 'components/atoms'
import {spaces} from 'styles'

interface Props {
    onResend: VoidFunction
    disableResend: boolean
}
const RegisterSuccessContainer: React.FunctionComponent<Props> = ({disableResend, onResend}) => (
    <>
        <div className="content">
            <Headline variant="h3">
                <FormattedMessage id="register_success.headline" defaultMessage="Almost done..." />
            </Headline>
            <Paragraph type="s3">
                <FormattedMessage
                    id="register_success.description"
                    defaultMessage="We've sent you an email. Open it up to activate your account."
                />
            </Paragraph>
            <div className="note">
                <Paragraph type="s1">
                    <FormattedMessage
                        id="register_success.description"
                        defaultMessage="Didn't receive an email? Try to resend it again."
                    />
                </Paragraph>

                <Button onClick={onResend} dimensions="extraSmall" disabled={disableResend}>
                    <FormattedMessage id="register_success.resend" defaultMessage="Resend email" />
                </Button>
            </div>
        </div>
        <style jsx>{`
            .content {
                margin-bottom: ${spaces.s90};
            }

            .content :global(.${Button.classes.root}) {
                margin-top: ${spaces.s12};
            }

            .note {
                margin-top: ${spaces.s30};
            }
        `}</style>
    </>
)

export default RegisterSuccessContainer
