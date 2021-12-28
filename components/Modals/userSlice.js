import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
  },
  reducers: {
    setUser: (state, action) => {
      Cookies.set('notes-user', action.payload)
      state.secrect = action.payload
    }
  }
})

export const selectCount = state => state.user.value;
export const selectUser = state => {
  if (state.secrect) { 
    return state.secrect
  } else { 
    const secrect = Cookies.get('notes-user')
    state.secrect = secrect
    return state.secrect;
  }
}

export const { setUser } = userSlice.actions

export default userSlice.reducer