import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    // returning the state (as usual)
    increment: ({ value }) => {
      return { value: value + 1 }
    },
    // mutating the state (Immer)
    // For Immer to work, all these conditions must be met:
    // 1. state must be an object, not a scalar, otherwise an error is thrown
    // 2. state mutation should include the 'state' variables (= no destructuring) otherwise state won't update
    // 3. when state is mutated it should *not* be returned (hence the curly braces)
    decrement: state => {
      state.value -= 1
    },
  },
})

const { actions, reducer } = counterSlice

// by convention, the 'reducer' is the default export and the actions are exported by name
export default reducer
export const { increment, decrement } = actions

// TODO: add a thunky slice using createAsyncThunk
// https://redux-toolkit.js.org/usage/usage-guide#async-requests-with-createasyncthunk
