import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import { getMerchants } from '../api/useMerchants'

// * normalizer
const merchantsAdapter = createEntityAdapter({
  selectId: merchant => merchant.id,
  sortComparer: false, // maintain sort order following any CRUD operation
})

// * thunk
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

// * reducers / actions

const initialState = merchantsAdapter.getInitialState({
  loading: 'idle',
})

const merchantsSlice = createSlice({
  name: 'merchants',
  initialState,
  reducers: {
    clear: () => initialState,
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
        merchantsAdapter.setAll(state, action.payload)
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

// * selectors
// memoized `reselect` selectors
const merchantsSelectors = merchantsAdapter.getSelectors()

// combine createEntityAdapter's ids/entities join (`selectAll`) with
// createAsyncThunk's `loading` / `error` state into one object
export const selectMerchants = ({ merchants }) => {
  const entities = merchantsSelectors.selectAll(merchants)
  const { loading, error } = merchants
  return { entities, loading, error }
}
export const selectMerchantById = id => ({ merchants }) =>
  merchantsSelectors.selectById(merchants, id)

const { reducer, actions } = merchantsSlice
export const { clear, reorder } = actions

export default reducer
