import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useQiscus from '~/hooks/useQiscus'
import useRoomStore from '~/store/room'

import Room from '~/components/Room'
import NavBar from '~/components/NavBar'
import OverlayButton from '~/components/OverlayButton'
import Button from '~/components/Button'
import { MessageIcon } from '~/components/icons'

import { css } from '~/styles'

import type { RoomState } from '~/store/room'

const styles = {
  roomContainer: css({
    mx: '$2',
    display: 'flex',
    flexDirection: 'column'
  })()
}

const Lobby = () => {
  const { isReady, qiscus } = useQiscus({ redirectTo: '/' })
  const navigate = useNavigate()

  const rooms = useRoomStore((s) => s.rooms)
  const setRooms = useRoomStore((s) => s.setRooms)
  const addRooms = useRoomStore((s) => s.addRooms)
  const page = useRoomStore((s) => s.page)
  const setPage = useRoomStore((s) => s.setPage)

  const [allRoomLoaded, setAllRoomLoaded] = useState(false)

  const mapRoom = (r: any): RoomState => ({
    id: r.id,
    name: r.name,
    avatar: r.avatar,
    lastMessage: r.last_comment_message,
    unreadCount: r.count_notif
  })

  const loadRooms = (replace = false) => {
    if (allRoomLoaded) return

    qiscus.loadRoomList({ page, limit: 10 }).then((newRooms: any) => {
      const rooms = newRooms.map(mapRoom)
      if (rooms.length === 0) {
        setAllRoomLoaded(true)
        return
      }

      if (replace) {
        setRooms(rooms)
      } else {
        addRooms(rooms)
      }
      setPage(page + 1)
    })
  }

  useEffect(() => {
    if (!isReady) return

    loadRooms(true)

    return () => {
      setPage(1)
    }
  }, [isReady])

  return (
    <>
      <NavBar title="Conversations" />
      {rooms.length > 0 ? (
        <ul className={styles.roomContainer}>
          {rooms.map((props, i) => {
            return <Room {...props} key={i} />
          })}
        </ul>
      ) : (
        <span>No conversation yet</span>
      )}

      {!allRoomLoaded ? (
        <Button onClick={() => loadRooms()}>Load More ({page})</Button>
      ) : null}

      <OverlayButton onClick={() => navigate('/chat/new')}>
        <MessageIcon color="white" />
      </OverlayButton>
    </>
  )
}

export default Lobby
