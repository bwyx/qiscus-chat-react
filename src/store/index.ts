import create from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    () => ({
      isAuthenticated: false
    }),
    {
      name: 'user'
    }
  )
)

export const setAuthenticated = (isAuthenticated: boolean) =>
  useStore.setState({ isAuthenticated })
