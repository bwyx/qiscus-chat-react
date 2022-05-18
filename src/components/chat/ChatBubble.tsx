import { css } from '~/styles'

const style = css({
  margin: '$2',
  py: '$2',
  px: '$4',
  maxWidth: '80%',
  fontSize: '$sm',
  fontWeight: '$light',
  lineHeight: '$snug',
  overflowWrap: 'break-word',
  whiteSpace: 'pre-line',
  color: 'white',
  borderRadius: '$2xl',
  '@sm': { fontSize: '$base' },
  variants: {
    received: {
      true: {
        float: 'left',
        xBackground: '$gray-800',
        borderBottomLeftRadius: 0
      },
      false: {
        float: 'right',
        xBackground: '$brand',
        borderBottomRightRadius: 0
      }
    }
  }
})

export interface ChatBubbleProps {
  text: string
  received: boolean
}

const ChatBubble = ({ text, received }: ChatBubbleProps) => {
  return <div className={style({ received })}>{text}</div>
}

export default ChatBubble
