import * as SwitchPrimitive from '@radix-ui/react-switch'

import { css } from '~/styles'

const styles = {
  switch: css({
    all: 'unset',
    width: 46,
    height: 28,
    backgroundColor: 'rgb(0 0 0 / 0.1)',
    borderRadius: '9999px',
    position: 'relative',
    boxShadow: 'inset -4px 4px 15px rgb(0 0 0 / 0.1)',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    '&:focus': { boxShadow: `0 0 0 2px black` },
    '&[data-state="checked"]': { xBackground: '$brand' }
  })(),
  thumb: css({
    display: 'block',
    width: 24,
    height: 24,
    backgroundColor: 'white',
    borderRadius: '$full',
    boxShadow: `-3px 3px 8px rgb(0 0 0 / 0.2)`,
    transition: 'transform 100ms',
    transform: 'translateX(2px)',
    willChange: 'transform',
    '&[data-state="checked"]': { transform: 'translateX(20px)' }
  })()
}

export interface SwitchProps {
  checked?: boolean
  onCheckedChange?: () => void
}

const Switch = ({ checked = false, ...props }: SwitchProps) => {
  return (
    <SwitchPrimitive.Root
      className={styles.switch}
      checked={checked}
      {...props}
    >
      <SwitchPrimitive.Thumb className={styles.thumb} />
    </SwitchPrimitive.Root>
  )
}

export default Switch
