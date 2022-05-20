import React, { useState, useEffect, createContext } from 'react'
import { useStore, setUser } from '~/store'
import useRoomStore from '~/store/room'

import QiscusSDK from 'qiscus-sdk-core'

import { env } from '~/config'

interface IQiscusContext {
  isReady: boolean
  qiscus: QiscusSDK
  login: QiscusSDK['setUser']
  logout: () => void
}

export const QiscusContext =
  createContext<IQiscusContext | undefined>(undefined)

const QiscusProvider = ({ children }: { children: React.ReactNode }) => {
  const [isReady, setIsReady] = useState(false)
  const [qiscus, setQiscus] = useState<QiscusSDK>(new QiscusSDK())

  const savedUser = useStore((state) => state.user)
  const onMessagesReceived = useRoomStore((s) => s.onMessagesReceived)
  const clearAllRooms = useRoomStore((s) => s.clearAllRooms)

  const loginSuccessCallback = ({ user }: any) => {
    setIsReady(true)
    setUser(user)
    console.log('loginSuccessCallback', user)
  }

  const loginErrorCallback = (error: any) => {
    alert(error.response.body.error.message)
    console.error(error)
  }

  const initQiscus = async (user: any = savedUser) => {
    const client = new QiscusSDK()

    client.init({
      AppId: env.VITE_QISCUS_APPID,
      options: {
        loginSuccessCallback,
        loginErrorCallback,
        newMessagesCallback: onMessagesReceived
      }
    })

    if (user) {
      console.log('[QiscusProvider] Using saved user')

      client.setUserWithIdentityToken({ user })
    }

    setQiscus(client)
  }

  const login = async (userId: string, userKey: string, userName: string) => {
    qiscus.setUser(userId, userKey, userName)
  }

  const logout = () => {
    qiscus.disconnect()
    setUser(null)
    clearAllRooms()
  }

  useEffect(() => {
    initQiscus()
  }, [])

  return (
    <QiscusContext.Provider value={{ isReady, qiscus, login, logout }}>
      {children}
    </QiscusContext.Provider>
  )
}

export default QiscusProvider
