import { useNavigate } from 'react-router-dom'
import Avatar from '~/components/Avatar'
import Button from '~/components/Button'
import NavBar from '~/components/NavBar'
import useQiscus from '~/hooks/useQiscus'
import stack from '~/styles/stack.style'
import text from '~/styles/text.style'

const Profile = () => {
  const { user, logout } = useQiscus({ redirectTo: '/' })
  const navigate = useNavigate()

  return (
    <>
      <NavBar title="Profile" left="back" onBack={() => navigate('/lobby')} />
      <div className={stack({ y: 'center', x: 'center', dir: 'col' })}>
        <Avatar size="xlarge" url={user?.avatar_url} name={user?.username} />
        <span className={text({ size: 'xs' })}>{user?.email}</span>
        <h1 className={text({ size: 'xl', weight: 'bold' })}>
          Hi, {user?.username}!
        </h1>
        <Button onClick={logout}>Logout</Button>
      </div>
    </>
  )
}

export default Profile
