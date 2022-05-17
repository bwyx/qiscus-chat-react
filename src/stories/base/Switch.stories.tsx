import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Switch, { SwitchProps } from '~/components/base/Switch'

export default {
  title: 'Base/Switch',
  component: Switch
} as ComponentMeta<typeof Switch>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Switch> = (args: SwitchProps) => (
  <Switch {...args} />
)

export const Checked = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Checked.args = {
  checked: true
}

export const Unchecked = Template.bind({})
Unchecked.args = {
  checked: false
}
