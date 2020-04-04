import {analyticsEvents} from 'utils/analytics'
import {useState} from 'react'
import {useRouter} from 'next/router'
import {useMutation} from 'react-apollo'

import {CreateAquascapeMutation} from 'graphql/generated/mutations'
import {CREATE_AQUASCAPE} from 'graphql/mutations'
import routes, {createDynamicPath} from 'routes'
import config from 'config'
import logger from 'services/logger'
import useAuthGuard from 'hooks/useAuthGuard'

const useCreateAquascape = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [createAquascapeMutation] = useMutation<CreateAquascapeMutation>(CREATE_AQUASCAPE)
    const authGuard = useAuthGuard()

    const createAquascape = () => {
        setLoading(true)
        createAquascapeMutation()
            .then(result => {
                const id = result.data?.createAquascape.id
                if (!id) return

                const path = createDynamicPath(routes.aquascapeDetailsEdit, {
                    id: id.toString(),
                    title: config.AQUASCAPE_URL_TITLE_PLACEHOLDER,
                })

                return router.push(`${path}?created=true`)
            })
            .catch(err => logger.error(err))
            .finally(() => setTimeout(() => setLoading(false), 1500)) // Wait for a redirect a little bit
    }

    return {
        createAquascape: authGuard(createAquascape, analyticsEvents.anonymousUser.createAquascape),
        loading,
    }
}

export default useCreateAquascape
