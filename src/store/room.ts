import create from 'zustand'
import produce from 'immer'

export interface RoomState {
  id: string
  name: string
  avatar: string
  messages?: string
  lastMessage: string
  unreadCount: number
}

interface IRoom {
  rooms: RoomState[]
  addRooms: (rooms: RoomState[]) => void

  page: number
  nextPage: () => void

  onMessagesReceived: (messages: any) => void
}

const useRoomStore = create<IRoom>((set, get) => ({
  rooms: [],
  page: 1,

  addRooms: (newRooms: RoomState[]) => {
    const rooms = get().rooms

    set({ rooms: [...rooms, ...newRooms] })
  },

  nextPage: () => set((state) => ({ page: state.page + 1 })),

  onMessagesReceived: (newMessages: any) => {
    newMessages.forEach((message: any) => {
      set(
        produce((s) => {
          const room = s.rooms.find((r: any) => r.id === message.room_id)

          if (room) {
            room.lastMessage = message.message
            room.unreadCount = room.unreadCount + 1
          }
        })
      )
    })
  }
}))

export default useRoomStore
