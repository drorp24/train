import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getUser } from '../api/fakeUsersApi'

// ! Error handling
//
// ? Throw every error
// Typically we would want the error to be placed in redux, so it can be reported.
// To that end, every error should be thrown, so it would be handled by the catch block which calls rejectWithValue
// rejectWithValuye wlil insert the error into the payload of the reject action
// where the reject action can find it and record it in the redux store (state.error = payload).
//
// ? Throw a string, not a new Error
// However, while it is customary to throw a new Error (which can include a stack trace etc),
// in the case of an asyncThunk we can only throw a string.
// This is because thunkAPI.rejectWithValue puts the error in the action's payload,
// and an action's payload must be serializable.
// If it's not, redux would throw, complaining an action must be serializable.
//
export const fetchUser = createAsyncThunk(
  'user/fetch',
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await getUser({ username, password })
      if (!data) throw 'No such user. Please try again'
      if (data.error) throw data.error
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const initialState = {
  currentRequestId: undefined,
  loading: 'idle',
  error: null,
  loggedIn: {},
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: {
    [fetchUser.pending]: (state, { meta: { requestId } }) => {
      if (state.loading === 'idle') {
        state.currentRequestId = requestId
        state.loading = 'pending'
        state.error = null
      }
    },

    [fetchUser.fulfilled]: (state, { meta: { requestId }, payload }) => {
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.currentRequestId = undefined
        state.loading = 'idle'
        state.error = null
        state.loggedIn = payload
      }
    },

    [fetchUser.rejected]: (state, { meta: { requestId }, payload }) => {
      console.log('payload: ', payload)
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.currentRequestId = undefined
        state.loading = 'idle'
        state.error = payload
      }
    },
  },
})

const { reducer, actions } = usersSlice
export const { logout } = actions

export default reducer
