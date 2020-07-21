import { createSlice } from '@reduxjs/toolkit'

const deviceSlice = createSlice({
  name: 'device',
  initialState: { mode: 'light' },
  reducers: {
    toggle: ({ mode }) => {
      return { mode: mode === 'light' ? 'dark' : 'light' }
    },
  },
})

const { actions, reducer } = deviceSlice

export default reducer
export const { toggle } = actions
