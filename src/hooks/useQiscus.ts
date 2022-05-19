import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '~/store'
import { QiscusContext } from '~/providers/QiscusProvider'

import type QiscusSDK from 'qiscus-sdk-core'

interface UseQiscusProps {
  redirectTo?: string
  redirectIfAuthenticated?: boolean
}

const useQiscus = ({
  redirectTo = '/',
  redirectIfAuthenticated = false
}: UseQiscusProps = {}) => {
  const navigate = useNavigate()
  const context = useContext(QiscusContext)
  const user = useStore((state) => state.user)

  if (context === undefined) {
    throw new Error('useQiscus must be used within a QiscusProvider')
  }

  const { qiscus, initQiscus } = context

  // Auth guard
  useEffect(() => {
    if (!redirectTo) return

    if (
      (redirectTo && !redirectIfAuthenticated && !user) ||
      (redirectIfAuthenticated && user)
    ) {
      navigate(redirectTo, { replace: true })
    }
  }, [user, redirectTo, redirectIfAuthenticated])

  // Initialize Qiscus SDK on first render if saved user not null
  useEffect(() => {
    if (user && !qiscus) {
      initQiscus(user)
    }
  }, [])

  return { ...context, qiscus: qiscus as QiscusSDK }
}

export default useQiscus
