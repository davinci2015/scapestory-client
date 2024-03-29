import log from 'loglevel'

import {isProduction} from 'utils/general'

if (!isProduction()) {
    log.setLevel(log.levels.TRACE)
}

export default {
    warn: (message: any) => log.warn(message),
    info: (message: any) => log.info(message),
    error: (message: any) => log.error(message),
    debug: (message: any) => log.debug(message),
    trace: (message: any) => log.trace(message),
}
