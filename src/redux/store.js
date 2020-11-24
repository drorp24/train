import { configureStore } from '@reduxjs/toolkit'

import counter from './counter'
import device from './device'
import todo from './todo'
import users from './users'

const store = configureStore({
  reducer: {
    counter,
    device,
    todo,
    users,
  },
})

export default store
