import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getMerchants } from '../api/useMerchants'

export const fetchMerchants = createAsyncThunk(
  'merchants/fetchMerchants',
  async thunkAPI => {
    try {
      const response = await getMerchants()
      return response.data?.merchants?.records
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const merchantsSlice = createSlice({
  name: 'merchants',
  initialState: { entities: [], loading: 'idle' },
  reducers: {
    clear: state => ({ ...state, entities: [] }),
    reorder: (state, { payload: { draggableId, source, destination } }) => {
      // Immer "mutation" to the rescue
      const [removed] = state.entities.splice(source.index, 1)
      state.entities.splice(destination.index, 0, removed)
      const originalSource =
        state.entities[destination.index].position?.source || source
      state.entities[destination.index].position = {
        draggableId,
        source: originalSource,
        destination,
      }
    },
  },
  extraReducers: {
    [fetchMerchants.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
        state.currentRequestId = action.meta.requestId
      }
    },

    [fetchMerchants.fulfilled]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        action.payload &&
          action.payload.forEach(entity => state.entities.push(entity))
        state.currentRequestId = undefined
      }
    },

    [fetchMerchants.rejected]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.error = action.error
        state.currentRequestId = undefined
      }
    },
  },
})

const { reducer, actions } = merchantsSlice
export const { clear, reorder } = actions

export default reducer
