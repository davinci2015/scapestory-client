import React, {useState} from 'react'
import Head from 'next/head'
import {toast} from 'react-toastify'

import {FormattedMessage, ToastMessage} from 'components/atoms'
import {Content, Grid} from 'components/core'
import config from 'config'
import {useMutation} from 'react-apollo'
import {RESEND_EMAIL} from './mutations'
import {useRouter} from 'next/router'
import routes from 'routes'
import logger from 'services/logger'
import RegisterSuccess from 'components/sections/RegisterSucces'

const RegisterSuccessContainer = () => {
    const router = useRouter()
    const [buttonDisabled, setDisabled] = useState(false)

    const email = router.query.email as string
    let decodedEmail = '[invalid email provided]'

    if (!email) {
        router.push(routes.index)
        return null
    }

    try {
        if (process.browser) {
            decodedEmail = atob(email)
        }
    } catch (e) {
        logger.error(e)
    }

    const [resendEmailMutation] = useMutation(RESEND_EMAIL)

    const resendEmail = () => {
        const timeout = 10 * 1000 // 10 sec
        resendEmailMutation({
            variables: {email: decodedEmail},
        })
            .then(() => {
                toast.success(
                    <ToastMessage>
                        <FormattedMessage
                            id="resend_email.email_resent"
                            defaultMessage="Email sent. Please check it again."
                        />
                    </ToastMessage>
                )
            })
            .catch(logger.error)
            .finally(() => {
                setDisabled(true)
                setTimeout(() => setDisabled(false), timeout)
            })
    }

    return (
        <>
            <Head>
                <title>{config.APP_NAME}</title>
            </Head>
            <Content>
                <Grid>
                    <RegisterSuccess
                        email={decodedEmail}
                        onResend={resendEmail}
                        disableResend={buttonDisabled}
                    />
                </Grid>
            </Content>
        </>
    )
}

export default RegisterSuccessContainer
