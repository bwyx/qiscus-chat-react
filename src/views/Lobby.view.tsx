import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useQiscus from '~/hooks/useQiscus'
import useRoomStore from '~/store/room'

import Room from '~/components/Room'
import NavBar from '~/components/NavBar'
import OverlayButton from '~/components/OverlayButton'
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
  const { isReady, qiscus, user } = useQiscus({ redirectTo: '/' })
  const navigate = useNavigate()

  const rooms = useRoomStore((s) => s.rooms)
  const addRooms = useRoomStore((s) => s.addRooms)
  const page = useRoomStore((s) => s.page)
  const nextPage = useRoomStore((s) => s.nextPage)

  const [allRoomLoaded, setAllRoomLoaded] = useState(false)

  const mapRoom = (r: any): RoomState => ({
    id: r.id,
    name: r.name,
    avatar: r.avatar,
    lastMessage: r.last_comment_message,
    unreadCount: r.count_notif
  })

  const loadRooms = () => {
    if (allRoomLoaded) return

    qiscus.loadRoomList({ page, limit: 10 }).then((newRooms: any) => {
      const rooms = newRooms.map(mapRoom)
      if (rooms.length === 0) {
        setAllRoomLoaded(true)
        return
      }

      addRooms(rooms)
      nextPage()
    })
  }

  useEffect(() => {
    if (!isReady || page !== 1) return

    loadRooms()
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
        <button onClick={loadRooms}>Load More {page}</button>
      ) : null}

      <OverlayButton onClick={() => navigate('/chat/new')}>
        <MessageIcon color="white" />
      </OverlayButton>
    </>
  )
}

export default Lobby
