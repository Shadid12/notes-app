import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { UpsertDocument } from '../../fql/Document'

export const saveDocument = createAsyncThunk(
  'document/saveDocument',
  async (args, { getState }) => {
    const state = getState();
    let id = args === 'NEW_DOCUMENT' ? null : args
    const value = state.document[args]
    const res = await UpsertDocument(id, value)
    return res.data
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

export const selectDocument = id => state => state?.document?.[id];

export const { setDocument } = editorSlice.actions

export default editorSlice.reducer