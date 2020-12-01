import { configureStore } from '@reduxjs/toolkit'

import app from './app'
import todo from './todo'
import users from './users'
import merchants from './merchants'

const store = configureStore({
  reducer: {
    app,
    todo,
    users,
    merchants,
  },
})

export default store
