import { useNavigate } from 'react-router-dom'

import { css } from '~/styles'
import stack from '~/styles/stack.style'
import text from '~/styles/text.style'

const styles = {
  outer: stack({
    css: {
      py: '$1',
      borderBottom: '1px solid rgb($rgb$fg3 / 0.1)'
    }
  }),
  avatar: css({
    mr: '$2',
    width: '3.5rem',
    height: '3.5rem',
    overflow: 'hidden',
    borderRadius: '$full'
  })(),
  roomName: text({
    size: 'base',
    css: {
      xColor: '$fg1'
    }
  }),
  message: text({
    size: 'sm',
    css: {
      xColor: '$fg3'
    }
  })
}

interface RoomProps {
  id: string
  name: string
  avatar: string
  message: string
  date: any
}

const Room = ({ id, name, avatar, message, date }: RoomProps) => {
  const navigate = useNavigate()
  const isFileMessage = message.includes('[file]')
  const snippetMessage = isFileMessage ? <em>File received.</em> : message

  return (
    <li onClick={() => navigate(`/chat?room=${id}`)} className={styles.outer}>
      <img className={styles.avatar} src={avatar} alt="" />
      <div>
        <h3 className={styles.roomName}>{name}</h3>
        <span className={styles.message}>{snippetMessage}</span>
      </div>
    </li>
  )
}

export default Room
