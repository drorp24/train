import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './counter'
import deviceReducer from './device'

const store = configureStore({
  reducer: { counter: counterReducer, device: deviceReducer },
})

export default store
