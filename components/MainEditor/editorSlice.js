import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { UpsertDocument, GetDocument, GetDocumentsByUser } from '../../fql/Document'
import Cookies from 'js-cookie'

export const saveDocument = createAsyncThunk(
  'document/saveDocument',
  async (_, { getState }) => {
    const state = getState();
    let id = state.document.currentDocument ? 
      state.document.currentDocument : 'NEW_DOCUMENT'
    const value = state.document[id]
    const userState = Cookies.get('notes-user')
    const userId = JSON.parse(userState).id
    const res = await UpsertDocument(id, value, userId)
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

export const getDocumentsByUser = createAsyncThunk(
  'document/getDocumentsByUser',
  async (_, { getState }) => { 
    const userState = Cookies.get('notes-user')
    if(!userState) { 
      return []
    }
    const userId = JSON.parse(userState).id
    const res = await GetDocumentsByUser(userId)
    if(!res.data) { 
      return null;
    }
    const notes = []
    for (const item of res.data) {
      notes.push({
        id: item.ref.id,
        ...item.data
    })
    }
    return notes
  }
)


export const editorSlice = createSlice({
  name: 'document',
  initialState: {
    loading: false,
    currentDocument: null,
    error: null,
    mydocs: []
  },
  reducers: {
    setDocument: (state, action) => { 
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
      console.error(err)
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
    },
    [getDocumentsByUser.pending]: (state) => {
      state.loading = true
    },
    [getDocumentsByUser.fulfilled]: (state, {payload}) => {
      state.loading = false
      state.mydocs = payload
    },
    [getDocumentsByUser.rejected]: (state, error) => { 
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