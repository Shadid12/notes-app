import { createSlice } from '@reduxjs/toolkit'

export const editorSlice = createSlice({
  name: 'document',
  initialState: {
  },
  reducers: {
    setDocument: (state, action) => { 
      state[action.payload.id] = action.payload.value
    },
    saveDocument: (state, action) => { 
      console.log('saveDocument', action.payload.id)
    }
  }
})

export const { setDocument, saveDocument } = editorSlice.actions

export default editorSlice.reducer