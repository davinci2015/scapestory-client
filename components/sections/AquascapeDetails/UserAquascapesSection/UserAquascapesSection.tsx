import React from 'react'

import {FormattedMessage, Headline} from 'components/atoms'
import {Grid} from 'components/core'
import {AquascapeCardList} from 'components/sections/shared'
import {renderAquascapeCards} from 'utils/render'
import {AquascapeFieldsFragment} from 'graphql/generated/queries'
import Section from 'components/sections/AquascapeDetails/Section'

interface Props {
    username: string
    aquascapes: AquascapeFieldsFragment[]
}

const UserAquascapesSection: React.FunctionComponent<Props> = ({aquascapes, username}) => (
    <>
        <Section>
            <AquascapeCardList
                title={
                    <Headline as="h2" variant="h3">
                        <FormattedMessage
                            id="aquascape.user_aquariums.title"
                            defaultMessage="{username}'s aquariums"
                            values={{username}}
                        />
                    </Headline>
                }
            >
                <Grid.Row>{renderAquascapeCards(aquascapes)}</Grid.Row>
            </AquascapeCardList>
        </Section>
        <style jsx>{``}</style>
    </>
)

export default UserAquascapesSection
