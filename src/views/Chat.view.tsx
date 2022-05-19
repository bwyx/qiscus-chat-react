import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import useQiscus from '~/hooks/useQiscus'

import { TextBubble } from '~/components/chat'
import { css } from '~/styles'

const styles = {
  messagesContainer: css({
    mx: '$2',
    display: 'flex',
    flexDirection: 'column',
    li: {
      mb: '$2'
    }
  })()
}

const Chat = () => {
  const { isReady, qiscus } = useQiscus()
  const [queries] = useSearchParams()
  const roomId = queries.get('room')

  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (!isReady) return

    qiscus.getRoomById(roomId).then((resp: any) => setMessages(resp.comments))
  }, [isReady, roomId])

  return (
    <div>
      <h1>Chat</h1>
      <ul className={styles.messagesContainer}>
        {messages.map(({ message, isSent }: any, i: number) => {
          return (
            <li key={i}>
              <TextBubble received={!isSent} text={message} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Chat
