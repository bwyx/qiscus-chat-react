import create from 'zustand'
import produce from 'immer'

export interface RoomState {
  id: number
  name: string
  avatar: string
  lastMessage: string
  unreadCount: number
}

interface IRoom {
  rooms: RoomState[]
  setRooms: (rooms: RoomState[]) => void
  addRooms: (rooms: RoomState[]) => void

  page: number
  setPage: (page: number) => void

  onMessagesReceived: (messages: any) => void

  clearAllRooms: () => void
}

const useRoomStore = create<IRoom>((set, get) => ({
  rooms: [],
  page: 1,

  setRooms: (rooms) => set({ rooms }),
  addRooms: (newRooms) => {
    const rooms = get().rooms

    set({ rooms: [...rooms, ...newRooms] })
  },

  setPage: (page) => set({ page }),

  onMessagesReceived: (newMessages) => {
    newMessages.forEach((message: any) => {
      console.log(message)

      set(
        produce((s) => {
          const room = s.rooms.find((r: any) => r.id === message.room_id)

          if (room) {
            room.lastMessage = message.message
            room.unreadCount = room.unreadCount + 1
          } else {
            s.rooms.unshift({
              id: message.room_id,
              name: message.raw_room_name,
              avatar: message.room_avatar,
              lastMessage: message.message,
              unreadCount: 1
            })
          }
        })
      )
    })
  },

  clearAllRooms: () => set({ rooms: [], page: 1 })
}))

export default useRoomStore
