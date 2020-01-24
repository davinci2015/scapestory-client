import React from 'react'
import {useRouter} from 'next/router'

import {Grid, Content} from 'components/core'
import {Headline, Paragraph, Button, FormattedMessage} from 'components/atoms'
import FooterContainer from 'containers/FooterContainer'
import {spaces} from 'styles'
import ModalProvider from 'providers/ModalProvider'
import NavigationContainer from 'containers/NavigationContainer'
import ArrowBackIcon from 'assets/icons/arrow-left.svg'
import routes from 'routes'
import withAuth from 'hocs/withAuth'

const Terms = () => {
    const router = useRouter()

    return (
        <>
            <ModalProvider>
                <NavigationContainer />
                <Content>
                    <Grid>
                        <div className="terms">
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
                            <Headline variant="h2">Terms and Conditions</Headline>

                            <Paragraph>
                                [Developer/Company name] built the [App Name] app as [open
                                source/free/freemium/ad-supported/commercial] app. This SERVICE is
                                provided by [Developer/Company name] [at no cost] and is intended
                                for use as is. This page is used to inform visitors regarding
                                [my/our] policies with the collection, use, and disclosure of
                                Personal Information if anyone decided to use [my/our] Service. If
                                you choose to use [my/our] Service, then you agree to the collection
                                and use of information in relation to this policy. The Personal
                                Information that [I/We] collect is used for providing and improving
                                the Service. [I/We] will not use or share your information with
                                anyone except as described in this Privacy Policy. The terms used in
                                this Privacy Policy have the same meanings as in our Terms and
                                Conditions, which is accessible at [App Name] unless otherwise
                                defined in this Privacy Policy.
                            </Paragraph>

                            <Headline variant="h4">Information Collection and Use</Headline>

                            <Paragraph>
                                For a better experience, while using our Service, [I/We] may require
                                you to provide us with certain personally identifiable
                                information[add whatever else you collect here, e.g. users name,
                                address, location, pictures] The information that [I/We] request
                                will be [retained on your device and is not collected by [me/us] in
                                any way]/[retained by us and used as described in this privacy
                                policy]. The app does use third party services that may collect
                                information used to identify you. Link to privacy policy of third
                                party service providers used by the app Google Play Services Log
                                Data [I/We] want to inform you that whenever you use [my/our]
                                Service, in a case of an error in the app [I/We] collect data and
                                information (through third party products) on your phone called Log
                                Data. This Log Data may include information such as your device
                                Internet Protocol (“IP”) address, device name, operating system
                                version, the configuration of the app when utilizing [my/our]
                                Service, the time and date of your use of the Service, and other
                                statistics.
                            </Paragraph>

                            <Headline variant="h4">Cookies</Headline>

                            <Paragraph>
                                Cookies are files with a small amount of data that are commonly used
                                as anonymous unique identifiers. These are sent to your browser from
                                the websites that you visit and are stored on your device's internal
                                memory. This Service does not use these “cookies” explicitly.
                                However, the app may use third party code and libraries that use
                                “cookies” to collect information and improve their services. You
                                have the option to either accept or refuse these cookies and know
                                when a cookie is being sent to your device. If you choose to refuse
                                our cookies, you may not be able to use some portions of this
                                Service.
                            </Paragraph>

                            <Headline variant="h4">Service Providers</Headline>

                            <Paragraph>
                                To facilitate our Service; [I/We] want to inform users of this
                                Service that these third parties have access to your Personal
                                Information. The reason is to perform the tasks assigned to them on
                                our behalf. However, they are obligated not to disclose or use the
                                information for any other purpose. To provide the Service on our
                                behalf; To perform Service-related services; or To assist us in
                                analyzing how our Service is used. [I/We] may employ third-party
                                companies and individuals due to the following reasons:
                            </Paragraph>

                            <Headline variant="h4">Security</Headline>

                            <Paragraph>
                                [I/We] value your trust in providing us your Personal Information,
                                thus we are striving to use commercially acceptable means of
                                protecting it. But remember that no method of transmission over the
                                internet, or method of electronic storage is 100% secure and
                                reliable, and [I/We] cannot guarantee its absolute security. Links
                                to Other Sites This Service may contain links to other sites. If you
                                click on a third-party link, you will be directed to that site. Note
                                that these external sites are not operated by [me/us]. Therefore,
                                [I/We] strongly advise you to review the Privacy Policy of these
                                websites. [I/We] have no control over and assume no responsibility
                                for the content, privacy policies, or practices of any third-party
                                sites or services. Children’s Privacy These Services do not address
                                anyone under the age of 13. [I/We] do not knowingly collect
                                personally identifiable information from children under 13. In the
                                case [I/We] discover that a child under 13 has provided [me/us] with
                                personal information, [I/We] immediately delete this from our
                                servers. If you are a parent or guardian and you are aware that your
                                child has provided us with personal information, please contact
                                [me/us] so that [I/We] will be able to do necessary actions. Changes
                                to This Privacy Policy [I/We] may update our Privacy Policy from
                                time to time. Thus, you are advised to review this page periodically
                                for any changes. [I/We] will notify you of any changes by posting
                                the new Privacy Policy on this page. These changes are effective
                                immediately after they are posted on this page. Contact Us If you
                                have any questions or suggestions about [my/our] Privacy Policy, do
                                not hesitate to contact [me/us] at [App Contact informations]. This
                                privacy policy page was created at privacypolicytemplate.net and
                                modified/generated by App Privacy Policy Generator
                            </Paragraph>
                        </div>
                    </Grid>
                </Content>
                <FooterContainer />
            </ModalProvider>

            <style jsx>{`
                .terms {
                    margin: 120px 0;
                }

                .terms :global(.${Headline.classes.root}) {
                    margin-top: ${spaces.s60};
                    margin-bottom: ${spaces.s24};
                }
            `}</style>
        </>
    )
}

export default withAuth(Terms)
