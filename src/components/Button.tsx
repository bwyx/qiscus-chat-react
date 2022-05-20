import { css } from '~/styles'

const style = css({
  mx: '$2',
  py: '$2',
  px: '$4',
  xBackground: '$brand',
  color: 'white',
  fontWeight: '$bold',
  borderRadius: '$2xl',
  '&:hover': {
    opacity: 0.8
  }
})()

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button className={style} {...props}>
      {children}
    </button>
  )
}

export default Button
