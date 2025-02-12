import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const todoAPI = {
  async fetchTodo() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_TODO_ENDPOINT}/todos`
      )
      return response
    } catch (error) {
      console.error(error)
    }
  },
}

export const fetchTodo = createAsyncThunk('todo/fetchTodo', async thunkAPI => {
  try {
    const response = await todoAPI.fetchTodo()
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

const todoSlice = createSlice({
  name: 'todo',
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
    [fetchTodo.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
        state.currentRequestId = action.meta.requestId
      }
    },

    [fetchTodo.fulfilled]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        action.payload.forEach(entity => state.entities.push(entity))
        state.currentRequestId = undefined
      }
    },

    [fetchTodo.rejected]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.error = action.error
        state.currentRequestId = undefined
      }
    },
  },
})

const { reducer, actions } = todoSlice
export const { clear, reorder } = actions

export default reducer
