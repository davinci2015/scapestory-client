import React from 'react'
import {useRouter} from 'next/router'
import Head from 'next/head'

import {Grid, Content} from 'components/core'
import {Headline, Paragraph, FormattedMessage, Button} from 'components/atoms'
import FooterContainer from 'views/FooterContainer'
import {spaces} from 'styles'
import ModalProvider from 'providers/ModalProvider'
import NavigationContainer from 'views/NavigationContainer'
import ArrowBackIcon from 'assets/icons/arrow-left.svg'
import routes from 'routes'
import withAuth from 'hocs/withAuth'
import {GridWidth} from 'components/core/Grid'
import useLogPageView from 'hooks/analytics'
import config from 'config'

const PrivacyPolicy = () => {
    const router = useRouter()
    useLogPageView()

    return (
        <>
            <Head>
                <title>{config.APP_NAME} - Privacy Policy</title>
            </Head>
            <ModalProvider>
                <NavigationContainer />
                <Content>
                    <Grid width={GridWidth.SMALL}>
                        <div className="privacy-policy">
                            <Button
                                dimensions="extraSmall"
                                variant="outlined"
                                onClick={() => router.push(routes.index)}
                                leftIcon={<ArrowBackIcon />}
                            >
                                <FormattedMessage
                                    id="general.home_page"
                                    defaultMessage="Home page"
                                />
                            </Button>
                            <Headline variant="h2">Privacy Policy</Headline>
                            <Paragraph>
                                Danijel Vincijanović built the Scapestory app as a Free app. This
                                SERVICE is provided by Danijel Vincijanović at no cost and is
                                intended for use as is.
                                <br /> <br />
                                This page is used to inform visitors regarding my policies with the
                                collection, use, and disclosure of Personal Information if anyone
                                decided to use my Service.
                                <br /> <br />
                                If you choose to use my Service, then you agree to the collection
                                and use of information in relation to this policy. The Personal
                                Information that I collect is used for providing and improving the
                                Service. I will not use or share your information with anyone except
                                as described in this Privacy Policy.
                                <br /> <br />
                                The terms used in this Privacy Policy have the same meanings as in
                                our Terms and Conditions, which is accessible at Scapestory unless
                                otherwise defined in this Privacy Policy.
                            </Paragraph>
                            <Headline variant="h4">Information Collection and Use</Headline>
                            <Paragraph>
                                For a better experience, while using our Service, I may require you
                                to provide with certain personally identifiable information,
                                including but not limited to email, name, profile photo. The
                                information that I request will be retained in a database. All
                                Personal Information collected via or by Scapestory may be stored
                                anywhere in the world, including but not limited to the European
                                Union, the United States, in the cloud, on the servers of service
                                providers. Your Personal Information may be accessible to law
                                enforcement or other authorities pursuant to a lawful request.
                                <br /> <br />
                                Scapestory may use your personal information in the following ways:
                                <ul>
                                    <li>
                                        To create your account and identify you as a user of the
                                        website
                                    </li>
                                    <li>To operate and maintain the website</li>
                                    <li>
                                        To send you promotional information, such as newsletters;
                                        Each e-mail newsletter will provide information on how to
                                        opt-out of future mailings by unsubscribing
                                    </li>
                                    <li>
                                        To send you administrative communications, such as
                                        administrative e-mails, confirmation e-mails, technical
                                        notices, updates on policies, or security alerts
                                    </li>
                                    <li>To provide you with user support</li>
                                    <li>
                                        To protect, investigate, and deter against unauthorized or
                                        illegal activity
                                    </li>
                                    <li>
                                        To share content on official Scapestory{' '}
                                        <a
                                            href="https://www.facebook.com/aquascapestory"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Facebook
                                        </a>{' '}
                                        and{' '}
                                        <a
                                            href="https://www.instagram.com/scapestory/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Instagram
                                        </a>{' '}
                                        page.
                                    </li>
                                </ul>
                                <br /> <br />
                                The app does use third party services that may collect information
                                used to identify you.
                                <br />
                                <a
                                    href="https://www.facebook.com/legal/FB_Work_Privacy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://www.facebook.com/legal/FB_Work_Privacy
                                </a>
                                <br />
                                <a
                                    href="https://policies.google.com/privacy?hl=en-US"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://policies.google.com/privacy?hl=en-US
                                </a>
                            </Paragraph>
                            <Headline variant="h4">Log Data</Headline>
                            <Paragraph>
                                I want to inform you that whenever you use my Service, in a case of
                                an error in the app I collect data and information (“Log Data”).
                                This Log Data may include information such as your device Internet
                                Protocol (“IP”) address, browser name and version, operating system
                                version, the time and date of your use of the Service, and other
                                statistics.
                            </Paragraph>
                            <Headline variant="h4">Cookies</Headline>
                            <Paragraph>
                                Cookies are small text files placed in visitors’ computer browsers
                                to store their preferences. Most browsers allow you to block and
                                delete cookies. However, if you do that, the Service will not work
                                properly. The app does use authentication cookie that identify a
                                user for the duration of the session once that user logs in to a
                                website and uses the site. The app may use cookies that allow to
                                offer you enhanced functionality when accessing or using site.
                            </Paragraph>
                            <Headline variant="h4">Service Providers</Headline>
                            <Paragraph>
                                I may employ third-party companies and individuals due to the
                                following reasons:
                            </Paragraph>
                            <ul>
                                <li>To facilitate our Service;</li>
                                <li>To provide the Service on our behalf;</li>
                                <li>To perform Service-related services;</li>
                                <li>To assist us in analyzing how our Service is used.</li>
                            </ul>
                            <Paragraph>
                                I want to inform users of this Service that these third parties have
                                access to your Personal Information. The reason is to perform the
                                tasks assigned to them on our behalf. However, they are obligated
                                not to disclose or use the information for any other purpose.
                            </Paragraph>
                            <Headline variant="h4">Security</Headline>
                            <Paragraph>
                                I take steps to ensure that your information is treated securely and
                                in accordance with this Privacy Policy. Unfortunately, the Internet
                                cannot be guaranteed to be 100% secure, and I cannot ensure or
                                warrant the security of any information you provide to me. I do not
                                accept liability for unintentional disclosure.
                            </Paragraph>
                            <Headline variant="h4">Data Storage and Processing</Headline>
                            <Paragraph>
                                I use infrastructure and storage services from Third-Party
                                infrastructure providers to provide you with Scapestory services.
                                Scapestory use Heroku (
                                <a
                                    href="https://www.heroku.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://aws.amazon.com
                                </a>
                                ) and Cloudinary (
                                <a
                                    href="https://cloudinary.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://cloudinary.com
                                </a>
                                ) for processing, data storage and other additional services as
                                needed.
                            </Paragraph>
                            <Headline variant="h4">Google Analytics</Headline>
                            <Paragraph>
                                This website uses “Google Analytics” to collect information about
                                usage of the site. Google Analytics collects information such as how
                                often users visit our site, what pages they visit when they do so,
                                and what other sites they used prior to coming to our site.
                                <br />
                                <br />
                                Collected informations from Google Analytics are used to to improve
                                the site. Google Analytics collects only the IP address assigned to
                                you on the date you visit our site, rather than your name or other
                                identifying information. I do not combine the information collected
                                through the use of Google Analytics with personally identifiable
                                information. Although Google Analytics plants a permanent cookie on
                                your web browser to identify you as a unique user the next time you
                                visit our site, the cookie cannot be used by anyone but Google.
                                Google’s ability to use and share information collected by Google
                                Analytics about your visits to our site is restricted by the Google
                                Analytics Terms of Use.
                                <br />
                                <a
                                    href="https://marketingplatform.google.com/about/analytics/terms/us/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://marketingplatform.google.com/about/analytics/terms/us/
                                </a>
                                <br />
                                You can prevent Google Analytics from recognizing you on return
                                visits to this site by disabling cookies on your browser.
                            </Paragraph>
                            <Headline variant="h4">Links to Other Sites</Headline>
                            <Paragraph>
                                This Service may contain links to other sites. If you click on a
                                third-party link, you will be redirected to that site. Note that
                                these external sites are not operated by me. Therefore, I strongly
                                advise you to review the Privacy Policy of these websites. I have no
                                control over and assume no responsibility for the content, privacy
                                policies, or practices of any third-party sites or services.
                            </Paragraph>
                            <Headline variant="h4">Children’s Privacy</Headline>
                            <Paragraph>
                                These Services do not address anyone under the age of 13. I do not
                                knowingly collect personally identifiable information from children
                                under 13. If I learn that I have collected any Personal Information
                                from children under 13, I will promptly take steps to delete such
                                information. If you are a parent or guardian and you are aware that
                                your child has provided me with personal information, please contact
                                me so that I will be able to do necessary actions.
                            </Paragraph>
                            <Headline variant="h4">Changes to This Privacy Policy</Headline>
                            <Paragraph>
                                I may update our Privacy Policy from time to time. Thus, you are
                                advised to review this page periodically for any changes. I will
                                notify you of any changes by posting the new Privacy Policy on this
                                page. These changes are effective immediately after they are posted
                                on this page.
                            </Paragraph>
                            <Headline variant="h4">Contact Us</Headline>
                            <Paragraph>
                                If you have any questions or suggestions about my Privacy Policy, do
                                not hesitate to contact me at {config.CONTACT_EMAIL}.
                            </Paragraph>
                        </div>
                    </Grid>
                </Content>
                <FooterContainer />
            </ModalProvider>

            <style jsx>{`
                .privacy-policy {
                    margin: ${spaces.s60} 0;
                }

                .privacy-policy :global(.${Headline.classes.root}) {
                    margin-top: ${spaces.s60};
                    margin-bottom: ${spaces.s24};
                }
            `}</style>
        </>
    )
}

export default withAuth(PrivacyPolicy)
