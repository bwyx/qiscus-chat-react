import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore, setAuthenticated } from '~/store'

interface UseAuthProps {
  redirectTo?: string
  redirectIfAuthenticated?: boolean
}

const useAuth = ({
  redirectTo = '/',
  redirectIfAuthenticated = false
}: UseAuthProps = {}) => {
  const navigate = useNavigate()
  const isAuthenticated = useStore((state) => state.isAuthenticated)

  const login = () => setAuthenticated(true)
  const logout = () => setAuthenticated(false)

  // Auth guard
  useEffect(() => {
    if (!redirectTo) return

    if (
      (redirectTo && !redirectIfAuthenticated && !isAuthenticated) ||
      (redirectIfAuthenticated && isAuthenticated)
    ) {
      navigate(redirectTo, { replace: true })
    }
  }, [isAuthenticated, redirectTo, redirectIfAuthenticated])

  return { login, logout }
}

export default useAuth
