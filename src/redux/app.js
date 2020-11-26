import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: { mode: 'light', language: 'en' },
  reducers: {
    toggleMode: ({ mode }) => {
      return { mode: mode === 'light' ? 'dark' : 'light' }
    },
    toggleLanguage: ({ language }) => {
      return { language: language === 'en' ? 'he' : 'en' }
    },
  },
})

const { actions, reducer } = appSlice

export default reducer
export const { toggleMode, toggleLanguage } = actions
