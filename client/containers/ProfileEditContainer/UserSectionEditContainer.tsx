import React, {ChangeEvent, useState} from 'react'
import {useMutation} from 'react-apollo'
import debounce from 'lodash.debounce'

import {UserBySlugQuery, MutationUpdateUserDetailsArgs} from 'graphql/generated/queries'
import {FormattedMessage, Textarea, Input, InputAdornment} from 'components/atoms'
import UserSection from 'components/sections/Profile/UserSection'
import UserStats from 'components/sections/Profile/UserStats'
import UserAbout from 'components/sections/Profile/UserAbout'
import EditableUserImage from 'components/sections/Profile/UserSection/EditableUserImage'
import {
    SocialNetwork,
    socialIconComponentMapping,
} from 'components/sections/Profile/UserAbout/SocialLink'
import {UPDATE_USER_DETAILS} from './mutations'
import {UserDetails} from 'graphql/generated/types'
import {isWebUri} from 'valid-url'
import UsernameInput from 'components/sections/Profile/UserSection/UsernameInput'
import {useIntl} from 'react-intl'

interface Props {
    user: UserBySlugQuery['user']
    onChangeProfileImage: (files: FileList | null) => void
}

type SocialNetworkKey = 'facebookUrl' | 'instagramUrl' | 'youtubeUrl' | 'twitterUrl'

interface SocialNetworkInput {
    key: SocialNetworkKey
    placeholder: string
    label: string
    Icon: () => JSX.Element
}

const socialNetworkInputs: SocialNetworkInput[] = [
    {
        key: 'facebookUrl',
        placeholder: 'Facebook URL',
        label: 'Facebook',
        Icon: socialIconComponentMapping[SocialNetwork.FACEBOOK],
    },
    {
        key: 'instagramUrl',
        placeholder: 'Instagram URL',
        label: 'Instagram',
        Icon: socialIconComponentMapping[SocialNetwork.INSTAGRAM],
    },
    {
        key: 'youtubeUrl',
        placeholder: 'Youtube URL',
        label: 'Youtube',
        Icon: socialIconComponentMapping[SocialNetwork.YOUTUBE],
    },
    {
        key: 'twitterUrl',
        placeholder: 'Twitter URL',
        label: 'Twitter',
        Icon: socialIconComponentMapping[SocialNetwork.TWITTER],
    },
]

const ABOUT_MAX_LEN = 200

const UserSectionEditContainer: React.FunctionComponent<Props> = ({onChangeProfileImage, user}) => {
    const [urlErrors, setUrlError] = useState<{[key in SocialNetworkKey]?: boolean}>({})
    const intl = useIntl()

    if (!user) return null

    const [updateUserDetailsMutation] = useMutation<MutationUpdateUserDetailsArgs>(
        UPDATE_USER_DETAILS
    )

    const updateNetworkUrl = (key: SocialNetworkKey) => (event: ChangeEvent<HTMLInputElement>) => {
        const url = event.target.value.trim()
        const isValid = Boolean(isWebUri(url))

        setUrlError({...urlErrors, [key]: !isValid})

        if (isValid) {
            debouncedDetailsUpdate({
                [key]: event.target.value.trim(),
            })
        }
    }

    const updateAbout = (event: ChangeEvent<HTMLTextAreaElement>) => {
        debouncedDetailsUpdate({about: event.target.value.trim()})
    }

    const updateName = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.value.trim().length) return

        debouncedDetailsUpdate({name: event.target.value.trim()})
    }

    const debouncedDetailsUpdate = debounce((details: UserDetails) => {
        updateUserDetailsMutation({variables: {details}})
    }, 800)

    return (
        <UserSection
            username={
                <UsernameInput
                    username={user.name}
                    onChange={updateName}
                    placeholder={intl.formatMessage({
                        id: 'user_profile.placeholder_name',
                        defaultMessage: 'Enter your name',
                    })}
                />
            }
            userImage={
                <EditableUserImage image={user.profileImage} onChange={onChangeProfileImage} />
            }
            stats={
                <UserStats>
                    <UserStats.Item
                        title={
                            <FormattedMessage
                                id="user_profile.followers"
                                defaultMessage="Followers"
                            />
                        }
                        value={user.followersCount}
                    />
                    <UserStats.Item
                        title={
                            <FormattedMessage
                                id="user_profile.followers"
                                defaultMessage="Following"
                            />
                        }
                        value={user.followingCount}
                    />
                    <UserStats.Item
                        title={
                            <FormattedMessage
                                id="user_profile.no_aquascapes"
                                defaultMessage="Aquascapes"
                            />
                        }
                        value={user.aquascapes.count}
                    />
                </UserStats>
            }
            about={
                <UserAbout
                    about={
                        <Textarea
                            defaultValue={user.about || ''}
                            maxLength={ABOUT_MAX_LEN}
                            onChange={updateAbout}
                            placeholder={intl.formatMessage({
                                id: 'user_profile.placeholder_about',
                                defaultMessage:
                                    'Write something about yourself... [max. 200 characters]',
                            })}
                        />
                    }
                    socialNetworkArea={socialNetworkInputs.map(network => (
                        <Input
                            key={network.key}
                            error={urlErrors[network.key]}
                            defaultValue={user[network.key] || ''}
                            placeholder={network.placeholder}
                            label={network.label}
                            onChange={updateNetworkUrl(network.key)}
                            errorMessage={intl.formatMessage({
                                id: 'user_profile.error_invalid_url',
                                defaultMessage: 'URL is incorrectly formatted',
                            })}
                            endAdornment={
                                <InputAdornment>
                                    <network.Icon />
                                </InputAdornment>
                            }
                        />
                    ))}
                />
            }
        />
    )
}

export default UserSectionEditContainer