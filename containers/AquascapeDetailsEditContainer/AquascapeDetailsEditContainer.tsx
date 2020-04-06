import React, {useContext, useEffect} from 'react'
import {useRouter} from 'next/router'
import {useQuery} from 'react-apollo'
import {FormattedMessage} from 'react-intl'
import {Element} from 'react-scroll'
import {toast} from 'react-toastify'

import {Divider, Icon, ToastMessage} from 'components/atoms'
import {Grid, Content, Hide} from 'components/core'
import {SubNavigation} from 'components/molecules'
import {AuthContext} from 'providers/AuthenticationProvider'
import {AquascapeDetailsQuery, AquascapeDetailsQueryVariables} from 'graphql/generated/queries'
import routes from 'routes'

import HeroSectionEditContainer from 'containers/AquascapeDetailsEditContainer/HeroSectionEditContainer'
import FloraSectionEditContainer from 'containers/AquascapeDetailsEditContainer/FloraSectionEditContainer'
import PhotoSectionEditContainer from 'containers/AquascapeDetailsEditContainer/PhotoSectionEditContainer'
import EquipmentSectionEditContainer from 'containers/AquascapeDetailsEditContainer/EquipmentSectionEditContainer'
import CommentsContainer from 'containers/AquascapeDetailsContainer/CommentsContainer'
import {OtherAquascapesSection} from 'components/sections/AquascapeDetails'
import {pxToNumber} from 'utils/converter'
import {breakpoints} from 'styles'
import SettingsIcon from 'assets/icons/settings.svg'
import {AQUASCAPE_DETAILS} from 'containers/AquascapeDetailsContainer/queries'

const sections = {
    PHOTO_POSTS: 'PHOTO_POSTS',
    FLORA: 'FLORA',
    EQUIPMENT: 'EQUIPMENT',
    COMMENTS: 'COMMENTS',
}

const AquascapeDetailsEditContainer: React.FunctionComponent = () => {
    const router = useRouter()
    const {isAuthenticated, user} = useContext(AuthContext)
    const aquascapeId = Number(router.query.id)

    const isFreshlyCreated = Boolean(router.query.created)

    useEffect(() => {
        if (!isAuthenticated) {
            router.push(routes.index)
        }
    }, [isAuthenticated])

    if (!aquascapeId || !user) return null

    const {data: aquascapeResult, error} = useQuery<
        AquascapeDetailsQuery,
        AquascapeDetailsQueryVariables
    >(AQUASCAPE_DETAILS, {variables: {id: aquascapeId}})

    useEffect(() => {
        if (isFreshlyCreated) {
            toast.success(
                <ToastMessage>
                    <FormattedMessage
                        id="aquascape.created_aquascape"
                        defaultMessage="Aquarium created! 🥳{br}On this page you can add images and edit details."
                        values={{br: <br />}}
                    />
                </ToastMessage>,
                {autoClose: 5000, hideProgressBar: true}
            )
        }
    }, [])

    useEffect(() => {
        if (
            user &&
            aquascapeResult?.aquascape?.user &&
            aquascapeResult.aquascape.user.id !== user.id
        ) {
            router.push(routes.index)
        }
    }, [aquascapeResult])

    useEffect(() => {
        if (
            !isFreshlyCreated &&
            aquascapeResult?.aquascape &&
            !aquascapeResult.aquascape.mainImageUrl &&
            !aquascapeResult.aquascape.images.length
        ) {
            toast(
                <ToastMessage>
                    <FormattedMessage
                        id="aquascape.empty_aquascape"
                        defaultMessage="Seems like your aquarium is empty.{br} Why don't you add some images? 🌱"
                        values={{br: <br />}}
                    />
                </ToastMessage>,
                {autoClose: 5000, hideProgressBar: true}
            )
        }
    }, [aquascapeResult])

    if (error) {
        // TODO: Show error
        return null
    }

    if (!aquascapeResult || !aquascapeResult.aquascape) {
        // TODO: Return not found page
        return null
    }

    if (aquascapeResult?.aquascape?.user?.id !== user.id) {
        return null
    }

    return (
        <Content>
            <HeroSectionEditContainer aquascape={aquascapeResult.aquascape} />
            <SubNavigation>
                <SubNavigation.Item offset={70} id={sections.PHOTO_POSTS}>
                    <Hide upTo={pxToNumber(breakpoints.small)}>
                        <FormattedMessage
                            id="aquascape.subnavigation.photo"
                            defaultMessage="Photo Diary"
                        />
                    </Hide>
                    <Hide after={pxToNumber(breakpoints.small)}>
                        <Icon d={Icon.CAMERA} />
                    </Hide>
                </SubNavigation.Item>
                <SubNavigation.Item offset={100} id={sections.FLORA}>
                    <Hide upTo={pxToNumber(breakpoints.small)}>
                        <FormattedMessage
                            id="aquascape.subnavigation.flora"
                            defaultMessage="Flora & Fauna"
                        />
                    </Hide>
                    <Hide after={pxToNumber(breakpoints.small)}>
                        <Icon d={Icon.PLANT} viewBox="0 0 48 48" size={42} />
                    </Hide>
                </SubNavigation.Item>
                <SubNavigation.Item offset={100} id={sections.EQUIPMENT}>
                    <Hide upTo={pxToNumber(breakpoints.small)}>
                        <FormattedMessage
                            id="aquascape.subnavigation.equipment"
                            defaultMessage="Equipment"
                        />
                    </Hide>
                    <Hide after={pxToNumber(breakpoints.small)}>
                        <SettingsIcon />
                    </Hide>
                </SubNavigation.Item>
                <SubNavigation.Item offset={100} id={sections.COMMENTS}>
                    <Hide upTo={pxToNumber(breakpoints.small)}>
                        <FormattedMessage
                            id="aquascape.subnavigation.comments"
                            defaultMessage="Comments ({count})"
                            values={{count: aquascapeResult.aquascape.comments.length}}
                        />
                    </Hide>
                    <Hide after={pxToNumber(breakpoints.small)}>
                        <Icon d={Icon.COMMENT} />
                    </Hide>
                </SubNavigation.Item>
            </SubNavigation>
            <Grid>
                <Element name={sections.PHOTO_POSTS}>
                    <PhotoSectionEditContainer
                        aquascapeId={aquascapeId}
                        images={aquascapeResult.aquascape.images}
                    />
                </Element>

                <Divider />

                <Element name={sections.FLORA}>
                    <FloraSectionEditContainer aquascape={aquascapeResult.aquascape} />
                </Element>

                <Divider />

                <Element name={sections.EQUIPMENT}>
                    <EquipmentSectionEditContainer aquascape={aquascapeResult.aquascape} />
                </Element>

                <Divider />

                <Element name={sections.COMMENTS}>
                    <CommentsContainer
                        aquascapeId={aquascapeId}
                        comments={aquascapeResult.aquascape.comments}
                    />
                </Element>

                {aquascapeResult.aquascapes && Boolean(aquascapeResult.aquascapes.rows.length) && (
                    <>
                        <Divider />
                        <OtherAquascapesSection aquascapes={aquascapeResult.aquascapes.rows} />
                    </>
                )}
            </Grid>
        </Content>
    )
}

export default AquascapeDetailsEditContainer
