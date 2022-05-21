import { css } from '~/styles'

const styles = {
  figure: css({
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
  }),
  img: css({
    maxWidth: '80%'
  })(),
  figcaption: css({
    wordBreak: 'break-all'
  })()
}

interface AttachmentBubbleProps {
  url: string
  caption: string
  fileName: string
  received: boolean
}

const AttachmentBubble = ({
  url,
  caption,
  fileName,
  received
}: AttachmentBubbleProps) => {
  return (
    <figure className={styles.figure({ received })}>
      <img className={styles.img} src={url} alt={fileName} />
      <figcaption className={styles.figcaption}>{caption}</figcaption>
    </figure>
  )
}

export default AttachmentBubble
