import { configureStore } from '@reduxjs/toolkit'
import userSlice from './components/Modals/userSlice'

export default configureStore({
  reducer: {
    user: userSlice
  }
})