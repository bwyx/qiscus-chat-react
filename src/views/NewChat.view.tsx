import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useQiscus from '~/hooks/useQiscus'

import { Avatar, Button, Contact, NavBar, OverlayButton } from '~/components'
import { TextInput } from '~/components/fields'
import { ArrowRightIcon } from '~/components/icons'

import { css } from '~/styles'

const styles = {
  selectedUsers: css({
    my: '$4',
    mx: '$8',
    display: 'flex',
    flexWrap: 'wrap'
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

  const [groupName, setGroupName] = useState('Qiscus Interview')
  const [users, setUsers] = useState<User[]>([])
  const [selectedUsersId, setSelectedUsersId] = useState<string[]>([])

  const getUser = (email: string) => users.find((u) => u.email === email) as any

  const handleContactClick = (user: any) => {
    if (isGroup) {
      if (!selectedUsersId.includes(user.email)) {
        setSelectedUsersId((s) => [...s, user.email])
      } else {
        setSelectedUsersId((s) => s.filter((e) => e !== user.email))
      }
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

      {isGroup ? (
        <>
          <TextInput
            type="text"
            label="Group Name"
            name="groupName"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          {!selectedUsersId.length ? 'select contacts' : null}
        </>
      ) : (
        <Button onClick={() => navigate('/chat/new?type=group')}>
          New Group
        </Button>
      )}

      {isGroup && selectedUsersId.length ? (
        <div className={styles.selectedUsers}>
          {selectedUsersId.map((email: string, i: number) => {
            const user = getUser(email)
            return (
              <Avatar
                key={i}
                size="large"
                url={user.avatar_url}
                name={user.name}
                onClick={() =>
                  setSelectedUsersId((s) =>
                    s.filter((email) => email !== user.email)
                  )
                }
              />
            )
          })}
        </div>
      ) : null}

      <ul>
        {users.map((user: any, i: number) => {
          const props = {
            selected: selectedUsersId.includes(user.email),
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
        <OverlayButton
          onClick={() => {
            qiscus
              .createGroupRoom(groupName, selectedUsersId, {
                avatar:
                  'https://cdn.kayiprihtim.com/wp-content/uploads/2022/05/Yeni-Avatar-The-Last-Airbender-filmleri-yolda-662x352.jpg'
              })
              .then((room: any) => {
                navigate(`/chat?room=${room.id}`)
              })
          }}
        >
          <ArrowRightIcon color="white" />
        </OverlayButton>
      ) : null}
    </>
  )
}

export default NewChat
