import useAuth from '~/hooks/useAuth'

const Login = () => {
  const { login } = useAuth({
    redirectTo: '/chat',
    redirectIfAuthenticated: true
  })

  return <button onClick={login}>Login</button>
}

export default Login
