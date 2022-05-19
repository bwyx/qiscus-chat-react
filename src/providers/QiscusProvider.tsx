import React, { useState, createContext } from 'react'
import { env } from '~/config'
import { setUser } from '~/store'

import type QiscusSDK from 'qiscus-sdk-core'

interface IQiscusContext {
  qiscus: QiscusSDK | null
  initQiscus: (user?: any) => Promise<QiscusSDK>
  login: QiscusSDK['setUser']
  logout: () => void
}

export const QiscusContext =
  createContext<IQiscusContext | undefined>(undefined)

const QiscusProvider = ({ children }: { children: React.ReactNode }) => {
  const [qiscus, setQiscus] = useState<QiscusSDK | null>(null)

  const initQiscus = async (user?: any) => {
    if (qiscus) {
      console.log('[QiscusProvider] Using already initialized Qiscus')

      return qiscus
    }

    console.log('[QiscusProvider] Initializing new Qiscus instance')
    const QiscusSDK = (await import('qiscus-sdk-core')).default

    const client = new QiscusSDK()

    client.debugMode = true
    client.init({
      AppId: env.VITE_QISCUS_APPID,
      options: {
        loginSuccessCallback: ({ user }: any) => {
          setUser(user)
          console.log('loginSuccessCallback', user)
        }
      }
    })

    if (user) {
      console.log('[QiscusProvider] Using saved user')

      client.setUserWithIdentityToken({ user })
    }

    setQiscus(client)
    return client
  }

  const login = async (userId: string, userKey: string, userName: string) => {
    const q = qiscus ? qiscus : await initQiscus()

    q.setUser(userId, userKey, userName)
  }

  const logout = () => {
    qiscus?.disconnect()
    setUser(null)
  }

  return (
    <QiscusContext.Provider value={{ qiscus, initQiscus, login, logout }}>
      {children}
    </QiscusContext.Provider>
  )
}

export default QiscusProvider
