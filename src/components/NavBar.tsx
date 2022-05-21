import Avatar from '~/components/Avatar'
import { useStore } from '~/store'
import { ChevronLeftIcon } from '~/components/icons'

import { css } from '~/styles'
import text from '~/styles/text.style'
import { useNavigate } from 'react-router-dom'

const styles = {
  outer: css({
    py: '$3',
    px: '$2',
    position: 'sticky',
    top: 0,
    display: 'grid',
    gridTemplateColumns: '3rem 1fr 3rem',
    alignItems: 'center',
    zIndex: '$50',
    xBackground: '$bg',
    borderBottom: '1px solid rgb($rgb$bg / 25%)',
    '@supports (backdrop-filter: saturate(180%) blur(1rem))': {
      xBackgroundOpacity: 0.6,
      backdropFilter: 'saturate(180%) blur(1rem)'
    }
  })(),
  title: text({
    size: 'lg',
    weight: 'bold',
    ellipsis: true,
    css: {
      maxWidth: '80%',
      mx: 'auto'
    }
  })
}

interface NavBar {
  title: string
  left?: 'avatar' | 'back'
  right?: React.ReactNode
  onBack?: () => void
}

const NavBar = ({ title, left = 'avatar', right, onBack }: NavBar) => {
  const user = useStore((state) => state.user)
  const navigate = useNavigate()

  const BackButton = () => {
    return (
      <button onClick={onBack}>
        <ChevronLeftIcon />
      </button>
    )
  }

  return (
    <div className={styles.outer}>
      {left === 'back' ? (
        <BackButton />
      ) : (
        <Avatar
          onClick={() => navigate('/me')}
          url={user?.avatar_url}
          name={user?.username}
        />
      )}
      <h1 className={styles.title}>{title}</h1>
      {right}
    </div>
  )
}

export default NavBar
