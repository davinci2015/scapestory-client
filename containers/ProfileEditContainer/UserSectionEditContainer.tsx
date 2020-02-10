import React, {ChangeEvent, useState} from 'react'
import {isWebUri} from 'valid-url'
import {useIntl} from 'react-intl'

import {UserBySlugQuery} from 'graphql/generated/queries'
import {FormattedMessage, Textarea, Input, InputAdornment} from 'components/atoms'
import UserSection from 'components/sections/Profile/UserSection'
import UserStats from 'components/sections/Profile/UserStats'
import UserAbout from 'components/sections/Profile/UserAbout'
import EditableUserImage from 'components/sections/Profile/UserSection/EditableUserImage'
import {
    SocialNetwork,
    socialIconComponentMapping,
} from 'components/sections/Profile/UserAbout/SocialLink'
import UsernameInput from 'components/sections/Profile/UserSection/UsernameInput'

interface Props {
    user: UserBySlugQuery['user']
    updateField: (key: string, value: string) => void
    onChangeProfileImage: (files: FileList | null) => void
}

type SocialNetworkKey = 'facebookUrl' | 'instagramUrl' | 'youtubeUrl' | 'twitterUrl'

interface SocialNetworkInput {
    key: SocialNetworkKey
    placeholder: string
    defaultValue?: string
    label: string
    Icon: () => JSX.Element
}

const socialNetworkInputs: SocialNetworkInput[] = [
    {
        key: 'facebookUrl',
        placeholder: 'https://www.facebook.com/YOUR-USERNAME',
        defaultValue: 'https://www.facebook.com/YOUR-USERNAME',
        label: 'Facebook Profile URL',
        Icon: socialIconComponentMapping[SocialNetwork.FACEBOOK],
    },
    {
        key: 'instagramUrl',
        placeholder: 'https://www.instagram.com/YOUR-USERNAME',
        defaultValue: 'https://www.instagram.com/YOUR-USERNAME',
        label: 'Instagram Profile URL',
        Icon: socialIconComponentMapping[SocialNetwork.INSTAGRAM],
    },
    {
        key: 'youtubeUrl',
        placeholder: 'https://www.youtube.com/channel/UCZoi3FvC280YqwSw0doGikA',
        defaultValue: 'https://www.youtube.com/channel/YOUR-CHANNEL-ID',
        label: 'Youtube Channel URL',
        Icon: socialIconComponentMapping[SocialNetwork.YOUTUBE],
    },
    {
        key: 'twitterUrl',
        placeholder: 'https://twitter.com/YOUR-USERNAME',
        defaultValue: 'https://twitter.com/YOUR-USERNAME',
        label: 'Twitter Profile URL',
        Icon: socialIconComponentMapping[SocialNetwork.TWITTER],
    },
]

const ABOUT_MAX_LEN = 500

const UserSectionEditContainer: React.FunctionComponent<Props> = ({
    onChangeProfileImage,
    updateField,
    user,
}) => {
    const [urlErrors, setUrlError] = useState<{[key in SocialNetworkKey]?: boolean}>({})
    const intl = useIntl()

    if (!user) return null

    const updateNetworkUrl = (key: SocialNetworkKey) => (event: ChangeEvent<HTMLInputElement>) => {
        const url = event.target.value.trim()

        if (url === '') {
            setUrlError({...urlErrors, [key]: false})
            return updateField(key, url)
        }

        const isValid = Boolean(isWebUri(url))
        setUrlError({...urlErrors, [key]: !isValid})

        if (isValid) updateField(key, url)
    }

    const updateAbout = (event: ChangeEvent<HTMLTextAreaElement>) => {
        updateField('about', event.target.value.trim())
    }

    const updateName = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value.trim()
        if (name === '') return

        updateField('name', event.target.value.trim())
    }

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
                <EditableUserImage
                    image={user.profileImage}
                    onChange={onChangeProfileImage}
                    username={user.name}
                />
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
                                defaultMessage: `Write something about yourself... [max. ${ABOUT_MAX_LEN} characters]`,
                            })}
                        />
                    }
                    socialNetworkArea={socialNetworkInputs.map(network => (
                        <Input
                            key={network.key}
                            error={urlErrors[network.key]}
                            defaultValue={user[network.key] || network.defaultValue}
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
