import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import TextInput, { TextInputProps } from '~/components/fields/TextInput'

export default {
  title: 'Fields/TextInput',
  component: TextInput
} as ComponentMeta<typeof TextInput>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TextInput> = (args: TextInputProps) => (
  <TextInput {...args} />
)

export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  type: 'email',
  name: 'email',
  label: 'Email',
  placeholder: 'john@doe.com',
  value: '',
  disabled: false
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...Default.args,
  disabled: true
}
