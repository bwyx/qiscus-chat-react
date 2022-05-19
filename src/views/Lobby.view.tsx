import { useState, useEffect } from 'react'
import useQiscus from '~/hooks/useQiscus'

import Room from '~/components/Room'
import { css } from '~/styles'

const styles = {
  roomContainer: css({
    mx: '$2',
    display: 'flex',
    flexDirection: 'column'
  })()
}

const Lobby = () => {
  const { isReady, qiscus, user } = useQiscus({ redirectTo: '/' })

  const [rooms, setRooms] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let shouldUpdateRooms = true
    if (!isReady || page !== 1) return
    setIsLoading(true)

    qiscus.loadRoomList({ page, limit: 10 }).then((rooms: any) => {
      if (shouldUpdateRooms) {
        setRooms(rooms)
        setIsLoading(false)
        setPage(page + 1)
      }
    })

    return () => {
      shouldUpdateRooms = false
    }
  }, [isReady])

  return (
    <div>
      <h1>Lobby Chat</h1>
      <div className={styles.roomContainer}>
        {rooms.map((room, i) => {
          const props = {
            id: room.id,
            name: room.name,
            avatar: room.avatar,
            message: room.last_comment_message,
            date: room.last_comment_message_created_at,
            received: room.last_comment.email !== user.email
          }

          return <Room {...props} key={i} />
        })}
      </div>
    </div>
  )
}

export default Lobby
