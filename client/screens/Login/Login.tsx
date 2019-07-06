import {LoginForm} from 'screens/Login/components'
import {Layout, FacebookLogin, GoogleLogin} from 'components/molecules'
import {colors, spaces} from 'styles'
import {Headline, Paragraph, FormattedMessage, Bubble, Button, ButtonIcon} from 'components/atoms'
import {FacebookProps} from 'components/molecules/FacebookLogin'
import {GoogleProps} from 'components/molecules/GoogleLogin'

const Login = () => {
    return (
        <Layout>
            <div className="container">
                <div className="bubble-top"><Bubble size="411px" /></div>
                <div className="bubble-bottom"><Bubble size="684px" /></div>
                <div className="">
                    <Headline as="h1" variant="h3">
                        <FormattedMessage id="login_title" defaultMessage="Welcome back! Your scapestory is waiting." />
                    </Headline>
                    <Paragraph as="p" color={colors.DARK_GRAY}>
                        <FormattedMessage id="login_subtitle" defaultMessage="Login and continue exploring aquascapes." />
                    </Paragraph>
                    <div className="form">
                        <LoginForm />
                    </div>
                    <div className="social">
                        <div className="social-text">
                            <Paragraph as="span" color={colors.DARK_GRAY}>
                                <FormattedMessage id="login_social_login_continue" defaultMessage="Or continue with" />
                            </Paragraph>
                        </div>
                        <div className="social-buttons">
                            <GoogleLogin>
                                {(props: GoogleProps) => (
                                    <Button color="secondary" onClick={props.onClick}>
                                        <ButtonIcon side="left">
                                            <img src="/static/icons/icon-google.png" alt="Google Login" />
                                        </ButtonIcon>
                                        <Paragraph weight="bold" as="span">
                                            Google
                                        </Paragraph>
                                    </Button>
                                )}
                            </GoogleLogin>
                            <FacebookLogin>
                                {(props: FacebookProps) => (
                                    <Button color="secondary" onClick={props.onClick}>
                                        <ButtonIcon side="left">
                                            <img src="/static/icons/icon-facebook.png" alt="Facebook Login" />
                                        </ButtonIcon>
                                        <Paragraph weight="bold" as="span">
                                            Facebook
                                        </Paragraph>
                                    </Button>
                                )}
                            </FacebookLogin>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .container {
                }

                .form {
                    margin-top: 90px;
                    margin-bottom: 24px;
                }

                .bubble-top > :global(.bubble) {
                    position: absolute;
                    top: -260px;
                    right: -200px;
                }

                .bubble-bottom > :global(.bubble) {
                    position: absolute;
                    left: -520px;
                    bottom: 10px;
                }

                .social {
                    text-align: center;
                    margin-bottom: ${spaces.s54};
                }

                .social-text {
                    margin: ${spaces.s24} 0;
                }

                .social-buttons {
                    display: flex;
                    justify-content: space-between;
                    margin: 0 -${spaces.s16};
                }

                .social-buttons img {
                    width: 100%;
                }

                .social-buttons > :global(.button) {
                    margin: 0 ${spaces.s16};
                }

            `}</style>
        </Layout>
    )
}

export default Login