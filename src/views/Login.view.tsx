import React, { useState } from 'react'
import { useStore } from '~/store'

import useAuth from '~/hooks/useQiscus'
import { TextInput } from '~/components/fields'

import { env } from '~/config'

const Login = () => {
  const { login } = useAuth({
    redirectTo: '/chat',
    redirectIfAuthenticated: true
  })

  const [userId, setUserId] = useState(env.VITE_QISCUS_USERID)
  const [userName, setUserName] = useState(env.VITE_QISCUS_USERNAME)
  const [userKey, setUserKey] = useState(env.VITE_QISCUS_PASSKEY)

  const user = useStore((state) => state.user)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login(userId, userKey, userName)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextInput
          name="userId"
          type="text"
          label="User ID"
          placeholder="john-doe"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <TextInput
          name="username"
          type="text"
          label="Username"
          placeholder="John Doe"
          value={userName}
          autoComplete="username"
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextInput
          name="userKey"
          type="password"
          label="User Key"
          placeholder="••••••••"
          value={userKey}
          autoComplete="current-password"
          onChange={(e) => setUserKey(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <pre
        style={{
          fontSize: 'var(--fontSizes-xs)',
          overflow: 'scroll',
          maxHeight: '300px'
        }}
      >
        {JSON.stringify({ user }, null, 2)}
      </pre>
    </>
  )
}

export default Login
