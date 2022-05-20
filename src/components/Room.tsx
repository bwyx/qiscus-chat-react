import { useNavigate } from 'react-router-dom'
import Avatar from '~/components/Avatar'

import stack from '~/styles/stack.style'
import text from '~/styles/text.style'

import type { RoomState } from '~/store/room'
import { css } from '~/styles'

const styles = {
  outer: stack({
    y: 'center',
    css: {
      cursor: 'pointer',
      '&:hover': {
        xBackground: '$brand',
        xBackgroundOpacity: 0.1
      }
    }
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
  }),
  unread: css({
    height: 20,
    width: 20,
    textAlign: 'center',
    xBackground: '$brand',
    color: 'white',
    fontSize: '$xs',
    fontWeight: '$bold',
    borderRadius: '$full'
  })()
}

const Room = ({ id, name, avatar, lastMessage, unreadCount }: RoomState) => {
  const navigate = useNavigate()
  const isFileMessage = lastMessage.includes('[file]')
  const fileMessage = <em>File attachment.</em>

  return (
    <li onClick={() => navigate(`/chat?room=${id}`)} className={styles.outer}>
      <Avatar url={avatar} name={name} size="large" />
      <div className={styles.detail}>
        <h3 className={styles.roomName}>{name}</h3>
        <span className={styles.message}>
          {isFileMessage ? fileMessage : lastMessage}
        </span>
      </div>
      {unreadCount ? (
        <span className={styles.unread}>{unreadCount}</span>
      ) : null}
    </li>
  )
}

export default Room
