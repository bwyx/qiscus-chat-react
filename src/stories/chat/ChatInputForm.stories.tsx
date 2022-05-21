import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import ChatInputForm, {
  ChatInputFormProps
} from '~/components/chat/ChatInputForm'

export default {
  title: 'Chat/ChatInputForm',
  component: ChatInputForm
} as ComponentMeta<typeof ChatInputForm>

const Template: ComponentStory<typeof ChatInputForm> = (
  args: ChatInputFormProps
) => <ChatInputForm {...args} />

const templateMessages = [
  'A Custom Message',
  'Okay',
  'Thank you!',
  'Welcome to Qiscus Chat!',
  'Hi, what can I help you with?',
  'Kamu udah makan?'
]

export const Default = Template.bind({})
Default.args = {
  templateMessages
}

export const ShowTemplateMessage = Template.bind({})
ShowTemplateMessage.args = {
  ...Default.args,
  showTemplateMessage: true
}
