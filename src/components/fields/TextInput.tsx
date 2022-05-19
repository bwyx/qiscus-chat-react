import React from 'react'
import { css } from '~/styles'
import { on } from '~/styles/themes'

const styles = {
  inputWrapper: css({
    mx: '$2',
    my: '$6'
  })(),
  label: css({
    pb: '$1',
    xColor: '$fg2',
    fontSize: '$sm',
    transitionProperty: 'color',
    transitionDuration: '150ms',
    transitionTimingFunction: 'cubic-bezier(0,.89,.44,1)'
  })(),
  input: css({
    py: '$4',
    px: '$4',
    xColor: '$fg1',
    display: 'block',
    width: '100%',
    lineHeight: '$none',
    fontWeight: '$medium',
    borderRadius: '$xl',
    fontSize: '$base',
    transitionProperty: 'background-color, border-color, color',
    transitionDuration: '150ms',
    transitionTimingFunction: 'cubic-bezier(0,.89,.44,1)',
    [on('light')]: {
      xBackground: '$gray-100',
      xBackgroundOpacity: 0.7,
      border: '1px solid rgb($rgb$gray-200)',
      '&:hover, &:focus': {
        borderColor: 'rgb($rgb$brand)'
      },
      '&:focus': {
        background: 'white',
        boxShadow: '0 0 0 4px rgb($rgb$brand / 0.15)'
      },
      '&:disabled': {
        xBackground: '$gray-200',
        border: '1px solid rgb($rgb$gray-300)'
      }
    },
    [on('dark')]: {
      xBackground: '$gray-700',
      xBackgroundOpacity: 0.4,
      border: '1px solid rgb($rgb$gray-700)',
      '&:hover, &:focus': {
        borderColor: 'rgb($rgb$brand / 0.7)'
      },
      '&:focus': {
        xBackgroundOpacity: 0.7,
        boxShadow: '0 0 0 4px rgb($rgb$brand / 0.25)'
      },
      '&:disabled': {
        xBackground: '$gray-800',
        border: '1px solid rgb($rgb$gray-800)'
      }
    },
    '&:hover, &:focus': {
      transition: 'box-shadow 0.3s, background-color 0.3s, border-color 0.3s',
      transitionTimingFunction: 'cubic-bezier(0,.89,.44,1)'
    },
    '&:focus': {
      outline: 'none'
    },
    '&:disabled': {
      cursor: 'not-allowed'
    },
    '&::placeholder': {
      xColor: '$fg3',
      xColorOpacity: 0.5
    }
  })()
}

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  type: string
  label: string
}

const TextInput = ({ name, type, label, ...props }: TextInputProps) => {
  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input className={styles.input} type={type} id={name} {...props} />
    </div>
  )
}

export default TextInput
