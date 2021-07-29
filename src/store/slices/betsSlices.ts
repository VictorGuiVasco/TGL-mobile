import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface BetsProps {
  id: number
  type: string
  description: string
  range: number
  price: number
  max_number: number
  color: string
  min_cart_value: number
}

const initialState: Array<BetsProps> = []

const betsSlice = createSlice({
  name: 'bets',
  initialState,
  reducers: {
    saveBets(state, action: PayloadAction<BetsProps>) {
      if (state.length === 3) return
      state.push(action.payload)
    },
  },
})

export const betAction = betsSlice.actions

export default betsSlice.reducer
