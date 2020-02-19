import React, {useContext} from 'react'
import {FormattedMessage} from 'react-intl'

import {Paragraph} from 'components/atoms'
import {RegistrationForm, AuthModal} from 'components/modals'

import {colors} from 'styles'
import {ModalContext} from 'providers/ModalProvider'
import cookie from 'services/cookie'
import {AuthContext} from 'providers/AuthenticationProvider'
import routes from 'routes'
import {renderFormattedMessageLink} from 'utils/render'

const RegistrationModal = () => {
    const {refreshAuthentication} = useContext(AuthContext)
    const {closeModal, openModal} = useContext(ModalContext)

    const openLoginModal = () => openModal('login')

    const handleSuccess = (token: string) => {
        cookie.persistAuthToken(token)
        refreshAuthentication()
        closeModal()
    }

    return (
        <AuthModal
            onSuccess={handleSuccess}
            form={<RegistrationForm />}
            title={
                <FormattedMessage
                    id="registration_title"
                    defaultMessage="Don’t be shy! Sign up and share your scapestory."
                />
            }
            subtitle={
                <FormattedMessage
                    id="registration_subtitle"
                    defaultMessage="Create account to get the full Scapestory experience."
                />
            }
            socialText={
                <Paragraph as="span" type="s1" color={colors.DARK_GRAY}>
                    <FormattedMessage
                        id="registration_social_login_agreement"
                        defaultMessage="By continuing with Google or Facebook you automatically accept <terms>Terms & Conditions</terms> and <privacy>Privacy Policy</privacy>"
                        values={{
                            terms: renderFormattedMessageLink(routes.termsAndConditions),
                            privacy: renderFormattedMessageLink(routes.privacyPolicy),
                        }}
                    />
                </Paragraph>
            }
            footer={
                <Paragraph as="span" color={colors.SHADE_DEEP}>
                    <FormattedMessage
                        id="registration_footer_not_member"
                        defaultMessage="Already have an account?"
                    />{' '}
                    <a onClick={openLoginModal}>
                        <Paragraph as="span" color={colors.PRIMARY} weight="bold">
                            <FormattedMessage
                                id="registration_footer_sign_up"
                                defaultMessage="Login"
                            />
                        </Paragraph>
                    </a>
                </Paragraph>
            }
        />
    )
}

export default RegistrationModal
