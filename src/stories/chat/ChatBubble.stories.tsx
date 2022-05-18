import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import ChatBubble, { ChatBubbleProps } from '~/components/chat/ChatBubble'

export default {
  title: 'Chat/ChatBubble',
  component: ChatBubble
} as ComponentMeta<typeof ChatBubble>

const Template: ComponentStory<typeof ChatBubble> = (args: ChatBubbleProps) => (
  <ChatBubble {...args} />
)

const text = "It's not a bug — it's an undocumented feature."

export const Sent = Template.bind({})
Sent.args = { text, received: false }

export const Received = Template.bind({})
Received.args = { text, received: true }
