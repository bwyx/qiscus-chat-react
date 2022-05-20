import { useNavigate } from 'react-router-dom'
import Avatar from '~/components/Avatar'
import { css } from '~/styles'

import stack from '~/styles/stack.style'
import text from '~/styles/text.style'

const styles = {
  outer: stack({
    y: 'center'
  }),
  detail: stack({
    dir: 'col',
    density: 'packed',
    grow: true,
    css: {
      py: '$2',
      borderBottom: '1px solid rgb($rgb$fg3 / 0.1)'
    }
  }),
  roomName: text({
    size: 'sm',
    css: {
      xColor: '$fg1'
    }
  }),
  message: text({
    size: 'xs',
    css: {
      xColor: '$fg3',
      em: {
        xColor: '$accent'
      }
    }
  })
}

export interface RoomProps {
  id: string
  name: string
  avatar: string
  message: string
  isLastMessageReceived: boolean
}

const Room = ({
  id,
  name,
  avatar,
  message,
  isLastMessageReceived
}: RoomProps) => {
  const navigate = useNavigate()
  const isFileMessage = message.includes('[file]')
  const fileMessage = (
    <em>File {isLastMessageReceived ? 'received' : 'sent'}.</em>
  )

  return (
    <li onClick={() => navigate(`/chat?room=${id}`)} className={styles.outer}>
      <Avatar url={avatar} name={name} size="large" />
      <div className={styles.detail}>
        <h3 className={styles.roomName}>{name}</h3>
        <span className={styles.message}>
          {isFileMessage ? fileMessage : message}
        </span>
      </div>
    </li>
  )
}

export default Room
