import create from 'zustand'

export const useStore = create(() => ({
  isAuthenticated: false
}))

export const setAuthenticated = (isAuthenticated: boolean) =>
  useStore.setState({ isAuthenticated })
