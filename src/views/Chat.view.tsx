import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useQiscus from '~/hooks/useQiscus'

import { TextBubble, ChatInputForm } from '~/components/chat'
import { css } from '~/styles'

const styles = {
  messagesContainer: css({
    mx: '$2',
    pb: '$20',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    li: {
      mb: '$2'
    },
    '@sm': {
      pb: '$24'
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
  const [queries] = useSearchParams()
  const roomId = queries.get('room')

  const [messages, setMessages] = useState<Message[]>([])

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
      qiscus.options.newMessageCallback = null
    }
  }, [])

  return (
    <>
      <h1>Chat</h1>
      <ul ref={messagesContainer} className={styles.messagesContainer}>
        {messages.map((props: Message, i: number) => {
          return (
            <li key={i}>
              <TextBubble {...props} />
            </li>
          )
        })}
      </ul>
      <ChatInputForm roomId={roomId} />
    </>
  )
}

export default Chat
