// ! createAsyncThunk
//
// When 'createAsyncThunk' is used as in here,
// there are no auto-generated action creators to dispatch from calling component.
//
// Instead of being auto-generated by redux-toolkit, the action creator in this case is the
// function name assigned to get the result of calling createAsyncThunk ('fetchTodoByUserId' in this case).
//
// Instead of dispatching an action creator, the calling component (Todo in this case) dispatches that function.
// That function, in turn, kicks off the promise defined in it
// and auto-dispatches the 'pending', 'fullfilled' or 'rejected' events on its own.
//
// The reducer for each of these 3 possible dispatches is defined in the 'extraReducers'.

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

// ToDo: do the reorder logic here, replacing the reoder function
const todoSlice = createSlice({
  name: 'todo',
  initialState: { entities: [], loading: 'idle' },
  reducers: {
    clear: state => ({ ...state, entities: [] }),
    reorder: (state, { payload: { draggableId, source, destination } }) => {
      // Immer "mutation" to the rescue
      const [removed] = state.entities.splice(source.index, 1)
      state.entities.splice(destination.index, 0, removed)
      state.entities[destination.index].position = {
        draggableId,
        source,
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
