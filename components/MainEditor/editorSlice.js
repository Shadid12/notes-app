import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { UpsertDocument, GetDocument } from '../../fql/Document'

export const saveDocument = createAsyncThunk(
  'document/saveDocument',
  async (_, { getState }) => {
    const state = getState();
    let id = state.document.currentDocument ? 
      state.document.currentDocument : 'NEW_DOCUMENT'
    const value = state.document[id]
    const res = await UpsertDocument(id, value)
    console.log('res ==>', res)
    return res.ref.id
  }
)

export const getDocument = createAsyncThunk(
  'document/getDocument',
  async (id, _) => {
    const res = await GetDocument(id)
    return { id: res.ref.id, value: res.data.value }
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
      if(!state.currentDocument) { 

      }
      state[state.currentDocument ? state.currentDocument : 'NEW_DOCUMENT'] 
        = action.payload.value
    },
  },
  extraReducers: { 
    [saveDocument.pending]: (state, action) => {
      state.loading = true
    },
    [saveDocument.fulfilled]: (state, {payload}) => {
      state.loading = false
      state.currentDocument = payload
    },
    [saveDocument.rejected]: (state, err) => {
      state.loading = false
      state.error = err
    },
    [getDocument.pending]: (state, action) => {
      state.loading = true
    },
    [getDocument.fulfilled]: (state, {payload}) => { 
      state.loading = false
      state.currentDocument = payload.id
      state[payload.id] = payload.value
    },
    [getDocument.rejected]: (state, error) => { 
      state.loading = false
      state.error = error
      console.log('Error', error)
    }
  }
})

export const selectCurrentDocument = state => state.document.currentDocument
export const selectDocumentVal = state => state.document[state.document.currentDocument]

export const { setDocument } = editorSlice.actions

export default editorSlice.reducer