import create from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    () => ({
      user: null
    }),
    { name: 'user' }
  )
)

export const setUser = (user: any) => useStore.setState({ user })
