import { css } from '~/styles'

const style = css({
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
    },
    isTemplateMessage: {
      true: {
        margin: '.15rem',
        cursor: 'pointer',
        '&:hover': {
          xBackgroundOpacity: 0.2
        }
      }
    }
  },
  compoundVariants: [
    {
      received: false,
      isTemplateMessage: true,
      css: {
        xBackground: '$fg3',
        xBackgroundOpacity: 0.25
      }
    }
  ]
})

export interface TextBubbleProps {
  text: string
  onClick?: () => void
  received: boolean
  isTemplateMessage?: boolean
}

const TextBubble = ({ text, onClick, ...styleProps }: TextBubbleProps) => {
  return (
    <div className={style(styleProps)} onClick={onClick}>
      {text}
    </div>
  )
}

export default TextBubble
