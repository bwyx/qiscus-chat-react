import create from 'zustand'
import { persist } from 'zustand/middleware'

interface IState {
  user: any
}

export const useStore = create<IState>(
  persist(
    () => ({
      user: null
    }),
    { name: 'user' }
  )
)

export const setUser = (user: any) => useStore.setState({ user })
