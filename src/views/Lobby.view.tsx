import { useState, useEffect } from 'react'
import useQiscus from '~/hooks/useQiscus'

import Room, { RoomProps } from '~/components/Room'
import { css } from '~/styles'
import { useNavigate } from 'react-router-dom'
import NavBar from '~/components/NavBar'
import OverlayButton from '~/components/OverlayButton'

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

  const [rooms, setRooms] = useState<RoomProps[]>([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  const mapRoom = (r: any): RoomProps => ({
    id: r.id,
    name: r.name,
    avatar: r.avatar,
    message: r.last_comment_message,
    isLastMessageReceived: r.last_message_by !== user.email
  })

  useEffect(() => {
    let shouldUpdateRooms = true
    if (!isReady || page !== 1) return
    setIsLoading(true)

    qiscus.options.newMessagesCallback = (newMessages: any) => {
      newMessages.forEach((m: any) => {
        const isRoomExist = rooms.find((r: any) => r.id === m.room_id)
        console.log(isRoomExist)

        if (isRoomExist) {
          console.log('mutate rooms state')
        }
      })
    }

    qiscus.loadRoomList({ page, limit: 10 }).then((rooms: any) => {
      if (shouldUpdateRooms) {
        const mappedRooms = rooms.map(mapRoom)

        setRooms(mappedRooms)
        setIsLoading(false)
        setPage(page + 1)
      }
    })

    return () => {
      shouldUpdateRooms = false
    }
  }, [isReady])

  return (
    <>
      <NavBar title="Conversations" />
      <ul className={styles.roomContainer}>
        {rooms.map((props, i) => {
          return <Room {...props} key={i} />
        })}
      </ul>
      <OverlayButton onClick={() => navigate('/chat/new')}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.4"
            d="M10.02 0C4.21 0 0 4.74 0 10C0 11.68 0.49 13.41 1.35 14.99C1.51 15.25 1.53 15.58 1.42 15.89L0.75 18.13C0.6 18.67 1.06 19.07 1.57 18.91L3.59 18.31C4.14 18.13 4.57 18.36 5.081 18.67C6.541 19.53 8.36 19.97 10 19.97C14.96 19.97 20 16.14 20 9.97C20 4.65 15.7 0 10.02 0Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.98049 11.2901C9.27049 11.2801 8.70049 10.7101 8.70049 10.0001C8.70049 9.30011 9.28049 8.72011 9.98049 8.73011C10.6905 8.73011 11.2605 9.30011 11.2605 10.0101C11.2605 10.7101 10.6905 11.2901 9.98049 11.2901ZM5.37009 11.2901C4.67009 11.2901 4.09009 10.7101 4.09009 10.0101C4.09009 9.30011 4.66009 8.73011 5.37009 8.73011C6.08009 8.73011 6.65009 9.30011 6.65009 10.0101C6.65009 10.7101 6.08009 11.2801 5.37009 11.2901ZM13.3103 10.0101C13.3103 10.7101 13.8803 11.2901 14.5903 11.2901C15.3003 11.2901 15.8703 10.7101 15.8703 10.0101C15.8703 9.30011 15.3003 8.73011 14.5903 8.73011C13.8803 8.73011 13.3103 9.30011 13.3103 10.0101Z"
            fill="white"
          />
        </svg>
      </OverlayButton>
    </>
  )
}

export default Lobby
