import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    secrect: '',
  },
  reducers: {
    setUser: (state, action) => { 
      console.log('action.payload', action.payload)
      state.secrect = action.payload
    }
  }
})

export const selectCount = state => state.user.value;

export const { setUser } = userSlice.actions

export default userSlice.reducer