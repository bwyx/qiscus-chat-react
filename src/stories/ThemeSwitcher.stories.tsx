import React from 'react'
import { ComponentMeta } from '@storybook/react'

import ThemeSwitcher from '~/components/ThemeSwitcher'

export default {
  title: 'Components/ThemeSwitcher',
  component: ThemeSwitcher
} as ComponentMeta<typeof ThemeSwitcher>

export const Default = <ThemeSwitcher />
