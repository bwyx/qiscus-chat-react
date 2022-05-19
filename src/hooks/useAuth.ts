import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore, setUser } from '~/store'

import qiscus from '~/libs/qiscus'
import { env } from '~/config'

interface UseAuthProps {
  redirectTo?: string
  redirectIfAuthenticated?: boolean
}

const useAuth = ({
  redirectTo = '/',
  redirectIfAuthenticated = false
}: UseAuthProps = {}) => {
  const navigate = useNavigate()
  const user = useStore((state) => state.user)

  const login = () =>
    qiscus.setUser(
      env.VITE_QISCUS_USERID,
      env.VITE_QISCUS_PASSKEY,
      env.VITE_QISCUS_USERNAME
    )
  const logout = () => {
    qiscus.disconnect()
    setUser(null)
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

  return { login, logout }
}

export default useAuth
