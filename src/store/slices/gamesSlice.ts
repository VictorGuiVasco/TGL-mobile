import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface GamesProps {
  id: number
  type: string
  description: string
  range: number
  price: number
  max_number: number
  color: string
  min_cart_value: number
}

const initialState: Array<GamesProps> = []

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    saveGames(state, action: PayloadAction<GamesProps>) {
      if (state.length === 3) return
      state.push(action.payload)
    },
  },
})

export const gameAction = gamesSlice.actions

export default gamesSlice.reducer
