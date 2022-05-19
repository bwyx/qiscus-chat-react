import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import TextBubble, { TextBubbleProps } from '~/components/chat/TextBubble'

export default {
  title: 'Chat/TextBubble',
  component: TextBubble
} as ComponentMeta<typeof TextBubble>

const Template: ComponentStory<typeof TextBubble> = (args: TextBubbleProps) => (
  <TextBubble {...args} />
)

const text = "It's not a bug — it's an undocumented feature."

export const Sent = Template.bind({})
Sent.args = { text, received: false }

export const Received = Template.bind({})
Received.args = { text, received: true }
