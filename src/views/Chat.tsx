import useAuth from '~/hooks/useAuth'

const Chat = () => {
  const { logout } = useAuth({ redirectTo: '/' })

  return (
    <div>
      <h1>Chat Page</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Chat
