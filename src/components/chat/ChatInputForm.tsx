import { useRef, useState } from 'react'
import { TextBubble } from '~/components/chat'

import { css } from '~/styles'
import { on } from '~/styles/themes'
import { stack, text } from '~/styles/primitives'

const styles = {
  form: css({
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    bottom: '1rem',
    left: '1rem',
    right: '1rem',
    margin: '0 auto',
    maxWidth: '$lg',
    py: '$4',
    px: '$4',
    xBackground: '$bg',
    border: '1px solid rgb($rgb$bg / 25%)',
    borderRadius: '$2xl',
    '@supports (backdrop-filter: saturate(180%) blur(1rem))': {
      xBackgroundOpacity: 0.6,
      backdropFilter: 'saturate(180%) blur(1rem)'
    },
    '@sm': {
      position: 'absolute',
      bottom: '2rem'
    }
  })(),
  input: css({
    py: '$2',
    pl: '$10',
    pr: '$4',
    xColor: '$fg1',
    fontSize: '$sm',
    lineHeight: '$snug',
    width: '100%',
    borderRadius: '$2xl',
    '&::placeholder': { color: 'rgb(255 255 255 / 0.25)' },
    [on('light')]: {
      xBackground: '$gray-600',
      xBackgroundOpacity: 0.5
    },
    [on('dark')]: {
      xBackground: '$gray-600',
      xBackgroundOpacity: 0.5
    }
  })(),
  menu: css({
    textAlign: 'left',
    padding: '$2',
    borderRadius: '$lg',
    '&:hover': {
      xBackground: '$gray-800',
      xBackgroundOpacity: 0.5
    }
  })()
}

export interface ChatInputFormProps {
  templateMessages?: string[]
  showTemplateMessage?: boolean
  onSendMessage: (message: string, type?: string, payload?: string) => void
  onFileUpload: (
    file: File,
    cb: (error: any, progress: any, fileURL: string) => void
  ) => void
}

const defaultTemplateMessages = [
  'Okay',
  'Thank you!',
  'Welcome to Qiscus Chat!',
  'Hi, what can I help you with?',
  'Kamu udah makan?'
]

const ChatInputForm = ({
  templateMessages = defaultTemplateMessages,
  showTemplateMessage,
  onSendMessage,
  onFileUpload
}: ChatInputFormProps) => {
  const imageInput = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [manuallyShowTemplateMessage, setManuallyShowTemplateMessage] =
    useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault()
    if (!message) return

    onSendMessage(message)
    setMessage('')
  }

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setMenuOpen(false)
    setMessage('')

    onFileUpload(file, (error, progress, fileURL) => {
      if (error) return console.error(error)

      if (fileURL) {
        const payload = JSON.stringify({
          url: fileURL,
          caption: message || '',
          file_name: file.name,
          size: file.size
        })

        onSendMessage(`[file] ${fileURL} [/file]`, 'file_attachment', payload)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="file"
        accept="image/*"
        onChange={handleUploadImage}
        ref={imageInput}
        style={{ opacity: 0, position: 'absolute', width: 0, height: 0 }}
      />
      {menuOpen && (
        <div className={stack({ dir: 'col' })}>
          <button
            type="button"
            className={styles.menu}
            onClick={() => imageInput.current?.click()}
          >
            <span className={text({ size: 'sm' })}>Upload a image</span>
          </button>
          <button
            type="button"
            className={styles.menu}
            onClick={() => {
              setMenuOpen(false)
              setManuallyShowTemplateMessage(true)
            }}
          >
            <span className={text({ size: 'sm' })}>Template message</span>
          </button>
        </div>
      )}
      {(showTemplateMessage || manuallyShowTemplateMessage) && (
        <ul style={{ margin: '.25rem 0' }}>
          {templateMessages.map((m, i) => (
            <li key={i}>
              <TextBubble
                received={false}
                isTemplateMessage={true}
                text={m}
                onClick={() => {
                  onSendMessage(m)
                  setManuallyShowTemplateMessage(false)
                }}
              />
            </li>
          ))}
        </ul>
      )}
      <div className={stack()}>
        <button
          type="button"
          style={{ position: 'absolute', padding: 6 }}
          onClick={() => {
            setManuallyShowTemplateMessage(false)
            setMenuOpen(!menuOpen)
          }}
        >
          <AttachmentIcon
            style={{ transform: `rotate(${menuOpen ? '45deg' : '0deg'})` }}
          />
        </button>
        <input
          className={styles.input}
          type="text"
          value={message}
          placeholder="Type a message..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button style={{ padding: '0 .5rem', marginRight: '-.5rem' }}>
          <SendIcon />
        </button>
      </div>
    </form>
  )
}

function SendIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.4274 2.5783C20.9274 2.0673 20.1874 1.8783 19.4974 2.0783L3.40742 6.7273C2.67942 6.9293 2.16342 7.5063 2.02442 8.2383C1.88242 8.9843 2.37842 9.9323 3.02642 10.3283L8.05742 13.4003C8.57342 13.7163 9.23942 13.6373 9.66642 13.2093L15.4274 7.4483C15.7174 7.1473 16.1974 7.1473 16.4874 7.4483C16.7774 7.7373 16.7774 8.2083 16.4874 8.5083L10.7164 14.2693C10.2884 14.6973 10.2084 15.3613 10.5234 15.8783L13.5974 20.9283C13.9574 21.5273 14.5774 21.8683 15.2574 21.8683C15.3374 21.8683 15.4274 21.8683 15.5074 21.8573C16.2874 21.7583 16.9074 21.2273 17.1374 20.4773L21.9074 4.5083C22.1174 3.8283 21.9274 3.0883 21.4274 2.5783Z"
        fill="currentColor"
      />
      <path
        opacity="0.4"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.01049 16.8077C2.81849 16.8077 2.62649 16.7347 2.48049 16.5877C2.18749 16.2947 2.18749 15.8207 2.48049 15.5277L3.84549 14.1617C4.13849 13.8697 4.61349 13.8697 4.90649 14.1617C5.19849 14.4547 5.19849 14.9297 4.90649 15.2227L3.54049 16.5877C3.39449 16.7347 3.20249 16.8077 3.01049 16.8077ZM6.77169 18.0001C6.57969 18.0001 6.38769 17.9271 6.24169 17.7801C5.94869 17.4871 5.94869 17.0131 6.24169 16.7201L7.60669 15.3541C7.89969 15.0621 8.37469 15.0621 8.66769 15.3541C8.95969 15.6471 8.95969 16.1221 8.66769 16.4151L7.30169 17.7801C7.15569 17.9271 6.96369 18.0001 6.77169 18.0001ZM7.02539 21.5681C7.17139 21.7151 7.36339 21.7881 7.55539 21.7881C7.74739 21.7881 7.93939 21.7151 8.08539 21.5681L9.45139 20.2031C9.74339 19.9101 9.74339 19.4351 9.45139 19.1421C9.15839 18.8501 8.68339 18.8501 8.39039 19.1421L7.02539 20.5081C6.73239 20.8011 6.73239 21.2751 7.02539 21.5681Z"
        fill="currentColor"
      />
    </svg>
  )
}

function AttachmentIcon(props: React.HTMLAttributes<SVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12 2.00098C6.486 2.00098 2 6.48698 2 12.001C2 17.515 6.486 22.001 12 22.001C17.514 22.001 22 17.515 22 12.001C22 6.48698 17.514 2.00098 12 2.00098ZM17 13.001H13V17.001H11V13.001H7V11.001H11V7.00098H13V11.001H17V13.001Z"
      ></path>
    </svg>
  )
}

export default ChatInputForm
