import type { VariantProps } from '@stitches/core'
import { css } from '~/styles'

const styles = {
  outer: css({
    mr: '$2',
    borderRadius: '$full',
    border: '1px solid rgb($rgb$fg3 / 0.2)',
    variants: {
      size: {
        small: {
          width: 32,
          height: 32
        },
        medium: {
          width: 40,
          height: 40
        },
        large: {
          width: 54,
          height: 54
        },
        xlarge: {
          width: 175,
          height: 175
        }
      }
    },
    defaultVariants: {
      size: 'medium'
    }
  }),
  img: css({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 'inherit'
  })()
}

interface AvatarProps {
  url: string
  name: string
  size?: VariantProps<typeof styles.outer>['size']
  onClick?: () => void
}

const Avatar = ({ url, name, size, onClick }: AvatarProps) => {
  return (
    <div className={styles.outer({ size })} onClick={onClick}>
      <img className={styles.img} src={url} alt={`${name}'s avatar`} />
    </div>
  )
}

export default Avatar
