import slugify from 'slugify'

export default {
    index: '/',
    registerSuccess: '/register/success',
    registerValidate: '/register/validate/[token]',
    about: '/about',
    privacyPolicy: '/privacy-policy',
    termsAndConditions: '/terms-and-condition',
    aquascapeDetails: '/aquascape/[title]/[id]',
    aquascapeDetailsEdit: '/aquascape/edit/[title]/[id]',
    profile: '/profile/[slug]',
    editProfile: '/profile/edit/[slug]',
}

export const getAquascapeDetailsSlug = (title: string) =>
    slugify(title, {
        lower: true,
    })

export const createDynamicPath = (path: string, values: {[key: string]: string}) => {
    for (const property in values) {
        if (values[property]) {
            path = path.replace(`[${property}]`, values[property])
        }
    }

    return path
}
