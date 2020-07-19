import { combineReducers } from 'redux'
import { createSlice, configureStore } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1, // I could also write 'state += 1' and it would translate to this thanks to Immer
    decrement: (state) => state - 1,
  },
})

const { actions, reducer } = counterSlice

// by convention, the 'reducer' is the default export and the actions are exported by name
// this makes sense when there are multiple separate reducers
// here I'm combining the reducers and exporting store since I only have 1.
const counterReducer = combineReducers({ counter: reducer })
export default counterReducer
export const { increment, decrement } = actions
export const store = configureStore({
  reducer: counterReducer,
})
