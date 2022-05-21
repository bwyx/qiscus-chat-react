import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useQiscus from '~/hooks/useQiscus'
import useRoomStore from '~/store/room'

import NavBar from '~/components/NavBar'
import { TextBubble, ChatInputForm } from '~/components/chat'
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
}

const Chat = () => {
  const messagesContainer = useRef<HTMLUListElement>(null)
  const { isReady, qiscus, user } = useQiscus()
  const navigate = useNavigate()
  const [queries] = useSearchParams()
  const roomId = queries.get('room')

  const onMessagesReceived = useRoomStore((s) => s.onMessagesReceived)
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const showTemplateMessage = !isLoading && messages.length === 0

  const mapMessage = (m: any): Message => ({
    text: m.message,
    received: m.email !== user.email
  })

  useEffect(() => {
    if (!isReady) return
    let shouldChangeState = true

    qiscus.getRoomById(roomId).then(({ comments }: any) => {
      const messagesHistory: Message[] = comments.map(mapMessage)

      if (!shouldChangeState) return
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
      <NavBar title="Room Chat" left="back" onBack={() => navigate('/lobby')} />
      {messages.length ? (
        <ul ref={messagesContainer} className={styles.messagesContainer}>
          {messages.map((props: Message, i: number) => {
            return (
              <li key={i}>
                <TextBubble {...props} />
              </li>
            )
          })}
        </ul>
      ) : null}
      <ChatInputForm
        showTemplateMessage={showTemplateMessage}
        onSendMessage={(message) => qiscus.sendComment(roomId, message)}
      />
    </>
  )
}

export default Chat
