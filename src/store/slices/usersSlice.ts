import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UsersProps {
  id: number
  username: string
  email: string
}

const initialState: UsersProps = { id: 0, username: '', email: '' }

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    saveUser(state, action: PayloadAction<UsersProps>) {
      state.id = action.payload.id
      state.username = action.payload.username
      state.email = action.payload.email
    },
    updateUser(state, action: PayloadAction<UsersProps>) {},
  },
})

export const usersAction = usersSlice.actions

export default usersSlice.reducer
