import { configureStore } from '@reduxjs/toolkit'

import app from './app'
import todo from './todo'
import users from './users'

const store = configureStore({
  reducer: {
    app,
    todo,
    users,
  },
})

export default store
