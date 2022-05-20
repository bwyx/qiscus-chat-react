import Avatar from '~/components/Avatar'

import stack from '~/styles/stack.style'
import text from '~/styles/text.style'

const styles = {
  outer: stack({
    css: {
      py: '$1',
      borderBottom: '1px solid rgb($rgb$fg3 / 0.1)'
    }
  }),
  name: text({
    size: 'base',
    css: {
      xColor: '$fg1'
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
  onClick?: () => void
}

const Contact = ({ avatar, name, onClick }: ContactProps) => {
  return (
    <li onClick={onClick} className={styles.outer}>
      <Avatar url={avatar} name={name} />
      <div>
        <h3 className={styles.name}>{name}</h3>
      </div>
    </li>
  )
}

export default Contact
