import React, { useState } from 'react'

import useQiscus from '~/hooks/useQiscus'
import { TextInput } from '~/components/fields'

import { env } from '~/config'
import Button from '~/components/Button'

const Login = () => {
  const { login } = useQiscus({
    redirectTo: '/lobby',
    redirectIfAuthenticated: true
  })

  const [userId, setUserId] = useState(env.VITE_QISCUS_USERID)
  const [userName, setUserName] = useState(env.VITE_QISCUS_USERNAME)
  const [userKey, setUserKey] = useState(env.VITE_QISCUS_PASSKEY)

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
        <Button>Login</Button>
      </form>
    </>
  )
}

export default Login
