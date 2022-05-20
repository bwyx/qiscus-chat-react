import useQiscus from '~/hooks/useQiscus'

const Profile = () => {
  const { user, logout } = useQiscus({ redirectTo: '/' })

  return (
    <div>
      <h1>Hi, {user?.username}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Profile
