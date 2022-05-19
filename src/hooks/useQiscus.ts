import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '~/store'
import { QiscusContext } from '~/providers/QiscusProvider'

interface UseQiscusProps {
  redirectTo?: string
  redirectIfAuthenticated?: boolean
}

const useQiscus = ({
  redirectTo = '/',
  redirectIfAuthenticated = false
}: UseQiscusProps = {}) => {
  const navigate = useNavigate()
  const qiscusContext = useContext(QiscusContext)
  const user = useStore((state) => state.user)

  if (qiscusContext === undefined) {
    throw new Error('useQiscus must be used within a QiscusProvider')
  }

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

  return { user, ...qiscusContext }
}

export default useQiscus
