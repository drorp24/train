import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './counter'
import deviceReducer from './device'
import todoReducer from './todo'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    device: deviceReducer,
    todo: todoReducer,
  },
})

export default store
