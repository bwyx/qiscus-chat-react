import Avatar from '~/components/Avatar'
import { css } from '~/styles'

import stack from '~/styles/stack.style'
import text from '~/styles/text.style'

const styles = {
  outer: stack({
    y: 'center',
    css: {
      cursor: 'pointer',
      mx: '$4',
      py: '$2',
      borderBottom: '1px solid rgb($rgb$fg3 / 0.1)',
      '&:hover': {
        xBackground: '$brand',
        xBackgroundOpacity: 0.1
      }
    }
  }),
  name: css({
    fontSize: '$sm',
    variants: {
      selected: {
        true: {
          xColor: '$brand'
        }
      }
    }
  }),
  message: text({
    size: 'sm',
    css: {
      xColor: '$fg3'
    }
  })
}

interface ContactProps {
  avatar: string
  name: string
  selected?: boolean
  onClick?: () => void
}

const Contact = ({ avatar, name, selected, onClick }: ContactProps) => {
  return (
    <li onClick={onClick} className={styles.outer}>
      <Avatar url={avatar} name={name} />
      <h3 className={styles.name({ selected })}>{name}</h3>
    </li>
  )
}

export default Contact
