import QiscusSDK from 'qiscus-sdk-core'
import { setUser } from '~/store'

import { env } from '~/config'

const qiscus = new QiscusSDK()

qiscus.debugMode = false
qiscus.init({
  AppId: env.VITE_QISCUS_APPID,
  options: {
    baseUrl: env.VITE_QISCUS_CUSTOM_BASE_URL,
    loginSuccessCallback: ({ user }: any) => {
      setUser(user)
      console.debug('loginSuccessCallback', user)
    }
  }
})

export default qiscus
