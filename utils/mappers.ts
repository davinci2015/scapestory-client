import {
    EquipmentOptionType,
    EquipmentInterface,
} from 'containers/AquascapeDetailsEditContainer/EquipmentSectionEditContainer'
import {MessageDescriptor} from 'react-intl'

export const groupEquipmentByBrand = (equipment: EquipmentInterface[]) => {
    let brand: string
    return Object.values(
        equipment.reduce((acc, item) => {
            brand = item.brand ? item.brand.name : 'Other'
            acc[brand] = acc[brand] || {label: brand, options: []}
            acc[brand].options.push({value: item.id, label: item.model})

            return acc
        }, {} as {[key: string]: {label: string; options: EquipmentOptionType[]}})
    )
}

export const errorMapper: {[key: string]: MessageDescriptor} = {
    NON_EXISTING_USER: {
        id: 'error.non_existing_user',
        defaultMessage: "User with provided email doesn't exist.",
    },
    EMAIL_NOT_CONFIRMED: {
        id: 'error.email_not_confirmed',
        defaultMessage: 'Please confirm your email before logging in.',
    },
    INVALID_CREDENTIALS: {
        id: 'error.invalid_credentials',
        defaultMessage: 'Invalid credentials provided.',
    },
    EMAIL_ALREADY_EXISTS: {
        id: 'error.email_already_exists',
        defaultMessage: 'User with provided email already exists.',
    },
    BAD_REQUEST: {
        id: 'error.bad_request',
        defaultMessage: 'Something went wrong. Please try again.',
    },
}
