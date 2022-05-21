import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useQiscus from '~/hooks/useQiscus'
import useRoomStore, { RoomState } from '~/store/room'

import { Avatar, NavBar } from '~/components'
import { TextBubble, ChatInputForm, AttachmentBubble } from '~/components/chat'
import { css } from '~/styles'

const styles = {
  messagesContainer: css({
    mx: '$4',
    pb: '$24',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    li: {
      mt: '$1'
    },
    '@sm': {
      pb: '$32'
    }
  })()
}

interface Message {
  text: string
  received: boolean
  type?: string
  payload?: Record<string, any>
}

type LocalRoomState = Omit<RoomState, 'unreadCount' | 'lastMessage'>

const Chat = () => {
  const messagesContainer = useRef<HTMLUListElement>(null)
  const { isReady, qiscus, user } = useQiscus()
  const navigate = useNavigate()
  const [queries] = useSearchParams()
  const roomId = queries.get('room')

  const onMessagesReceived = useRoomStore((s) => s.onMessagesReceived)
  const [room, setRoom] = useState<LocalRoomState | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const showTemplateMessage = !isLoading && messages.length === 0

  const mapMessage = (m: any): Message => ({
    text: m.message,
    received: m.email !== user.email,
    type: m.type,
    payload: m.payload
  })

  useEffect(() => {
    if (!isReady) return
    let shouldChangeState = true

    qiscus.getRoomById(roomId).then(({ comments, ...data }: any) => {
      if (!shouldChangeState) return

      const roomData = {
        id: data.id,
        name: data.name,
        avatar: data.avatar
      }
      const messagesHistory: Message[] = comments.map(mapMessage)

      setRoom(roomData)
      setMessages(messagesHistory)
      setIsLoading(false)
    })

    return () => {
      shouldChangeState = false
    }
  }, [isReady, roomId])

  useEffect(() => {
    messagesContainer.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    })
  }, [messages])

  useEffect(() => {
    let shouldChangeState = true
    qiscus.options.newMessagesCallback = (m: any) => {
      const thisRoomMessage = m.filter((m: any) => m.room_id_str === roomId)

      if (thisRoomMessage.length === 0) return
      const newMessages: Message[] = m.map(mapMessage)

      if (!shouldChangeState) return
      setMessages((messages) => [...messages, ...newMessages])
    }

    return () => {
      shouldChangeState = false
      qiscus.options.newMessagesCallback = onMessagesReceived
    }
  }, [])

  return (
    <>
      <NavBar
        title={room?.name || 'Room Chat'}
        left="back"
        right={
          room && <Avatar size="medium" url={room.avatar} name={room.name} />
        }
        onBack={() => navigate('/lobby')}
      />
      {messages.length ? (
        <ul ref={messagesContainer} className={styles.messagesContainer}>
          {messages.map((message: Message, i: number) => {
            const Component =
              message.type === 'file_attachment' ? AttachmentBubble : TextBubble

            const attachmentProps = {
              url: message?.payload?.url,
              caption: message?.payload?.caption,
              fileName: message?.payload?.file_name
            }

            return (
              <li key={i}>
                <Component {...message} {...attachmentProps} />
              </li>
            )
          })}
        </ul>
      ) : null}
      <ChatInputForm
        showTemplateMessage={showTemplateMessage}
        onSendMessage={(message, type, payload) =>
          qiscus.sendComment(roomId, message, null, type, payload)
        }
        onFileUpload={(file, cb) => qiscus.upload(file, cb)}
      />
    </>
  )
}

export default Chat
