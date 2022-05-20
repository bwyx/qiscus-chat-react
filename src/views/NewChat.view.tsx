import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useQiscus from '~/hooks/useQiscus'

import Contact from '~/components/Contact'
import NavBar from '~/components/NavBar'
import { css } from '~/styles'
import OverlayButton from '~/components/OverlayButton'
import { ArrowRightIcon } from '~/components/icons'

const styles = {
  selectedUsers: css({
    my: '$4'
  })()
}

interface User {
  id: number
  name: string
  avatar: string
  email: string
}

const NewChat = () => {
  const { qiscus, isReady } = useQiscus()
  const navigate = useNavigate()
  const [queries] = useSearchParams()
  const isGroup = queries.get('type') === 'group'

  const [users, setUsers] = useState<User[]>([])
  const [selectedUsersId, setSelectedUsersId] = useState<number[]>([])

  const handleContactClick = (user: any) => {
    if (isGroup) {
      alert('Group chat not supported yet')
    } else {
      qiscus.chatTarget(user.email).then((room: any) => {
        navigate(`/chat?room=${room.id}`)
      })
    }
  }

  useEffect(() => {
    if (!isReady) return
    let shouldChangeState = true

    qiscus.getUsers('', 1, 10).then(({ users }: any) => {
      if (!shouldChangeState) return

      console.log(users)

      setUsers(users)
    })

    return () => {
      shouldChangeState = false
    }
  }, [isReady])

  return (
    <>
      <NavBar
        title={isGroup ? 'New Group' : 'Choose Contact'}
        left="back"
        onBack={() => navigate('/lobby')}
      />
      {isGroup && selectedUsersId.length ? (
        <ul className={styles.selectedUsers}>
          {selectedUsersId.map((user: any) => {
            return <div>{JSON.stringify(user)}</div>
          })}
        </ul>
      ) : null}
      <button onClick={() => navigate('/chat/new?type=group')}>
        New Group
      </button>
      <ul>
        {users.map((user: any, i: number) => {
          const props = {
            name: user.name,
            avatar: user.avatar_url
          }

          return (
            <Contact
              {...props}
              onClick={() => handleContactClick(user)}
              key={i}
            />
          )
        })}
      </ul>
      {isGroup ? (
        <OverlayButton>
          <ArrowRightIcon color="white" />
        </OverlayButton>
      ) : null}
    </>
  )
}

export default NewChat
