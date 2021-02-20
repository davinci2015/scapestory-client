import React from 'react'

import {FormattedMessage, Headline, Input, SelectDefault} from 'components/atoms'
import {spaces} from 'styles'

interface Props {}

const InfoEdit: React.FunctionComponent<Props> = () => {
    return (
        <>
            <div className="section">
                <Headline as="h2" variant="h3">
                    <FormattedMessage id="aquascape.info.title" defaultMessage="General Info" />
                </Headline>
                <div className="inputs">
                    <div className="input">
                        <Input placeholder="100" label="Tank volume (in litres)" type="number" />
                    </div>
                    <div className="input">
                        <SelectDefault
                            onChange={() => null}
                            placeholder="Select aquascape style"
                            options={[
                                {label: 'Nature aquarium', value: 1},
                                {label: 'Iwagumi', value: 2},
                                {label: 'Diorama', value: 3},
                                {label: 'Dutch', value: 4},
                                {label: 'Biotope', value: 4},
                                {label: 'Pond style', value: 4},
                                {label: 'Other', value: 5},
                            ]}
                        />
                    </div>
                </div>
            </div>
            <style jsx>{`
                .section {
                    padding-top: ${spaces.s60};
                }

                .section :global(.${Headline.classes.root}) {
                    margin-bottom: ${spaces.s48};
                }

                .inputs {
                    width: 50%;
                }

                .input {
                    margin-bottom: ${spaces.s18};
                }
            `}</style>
        </>
    )
}

export default InfoEdit
