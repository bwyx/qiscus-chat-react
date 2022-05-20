import { css } from '~/styles'

const style = css({
  padding: '$4',
  position: 'fixed',
  bottom: '2rem',
  right: '1rem',
  xBackground: '$brand',
  color: 'white',
  borderRadius: '$full',
  boxShadow: '0 10px 35px 0 rgb($rgb$fg3 / 0.6)',
  '&:hover': {
    boxShadow: '0 10px 35px 0 rgb($rgb$brand / 0.8)'
  },
  '@sm': {
    position: 'absolute'
  }
})()

interface OverlayButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const OverlayButton = ({ children, ...props }: OverlayButtonProps) => {
  return (
    <button {...props} className={style}>
      {children}
    </button>
  )
}

export default OverlayButton
