import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { UpsertDocument } from '../../fql/Document'

export const saveDocument = createAsyncThunk(
  'document/saveDocument',
  async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const result = res.json()
    return result
  }
) 


export const editorSlice = createSlice({
  name: 'document',
  initialState: {
    loading: false,
    currentDocument: null,
    error: null,
  },
  reducers: {
    setDocument: (state, action) => { 
      state[action.payload.id] = action.payload.value
    },
  },
  extraReducers: { 
    [saveDocument.pending]: (state, action) => {
      state.loading = true
    },
    [saveDocument.fulfilled]: (state, {payload}) => {
      state.loading = false
      console.log('payload', payload)
    },
    [saveDocument.rejected]: (state, {payload}) => {
      state.loading = false
      state.error = payload
    }
  }
})

export const { setDocument } = editorSlice.actions

export default editorSlice.reducer