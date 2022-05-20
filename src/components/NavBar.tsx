import Avatar from '~/components/Avatar'
import useQiscus from '~/hooks/useQiscus'

import { css } from '~/styles'
import text from '~/styles/text.style'

const styles = {
  outer: css({
    py: '$3',
    px: '$2',
    position: 'sticky',
    top: 0,
    display: 'grid',
    gridTemplateColumns: '3rem 1fr 3rem',
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
    css: {
      mx: 'auto'
    }
  })
}

interface NavBar {
  title: string
  left?: 'avatar' | 'back'
  onBack?: () => void
}

const NavBar = ({ title, left = 'avatar', onBack }: NavBar) => {
  const { user } = useQiscus()

  const BackButton = () => {
    return (
      <button onClick={onBack}>
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.4"
            d="M12.0001 22.0002C6.48512 22.0002 2.00012 17.5142 2.00012 12.0002C2.00012 6.4862 6.48512 2.0002 12.0001 2.0002C17.5141 2.0002 22.0001 6.4862 22.0001 12.0002C22.0001 17.5142 17.5141 22.0002 12.0001 22.0002Z"
            fill="rgb(var(--rgb-fg1))"
          />
          <path
            d="M13.4425 16.2209C13.2515 16.2209 13.0595 16.1479 12.9135 16.0019L9.42652 12.5319C9.28552 12.3909 9.20652 12.1999 9.20652 11.9999C9.20652 11.8009 9.28552 11.6099 9.42652 11.4689L12.9135 7.9969C13.2065 7.7049 13.6805 7.7049 13.9735 7.9989C14.2655 8.2929 14.2645 8.7679 13.9715 9.0599L11.0185 11.9999L13.9715 14.9399C14.2645 15.2319 14.2655 15.7059 13.9735 15.9999C13.8275 16.1479 13.6345 16.2209 13.4425 16.2209Z"
            fill="rgb(var(--rgb-fg1))"
          />
        </svg>
      </button>
    )
  }

  return (
    <div className={styles.outer}>
      {left === 'back' ? (
        <BackButton />
      ) : (
        <Avatar url={user.avatar_url} name={user.username} />
      )}
      <h1 className={styles.title}>{title}</h1>
    </div>
  )
}

export default NavBar
