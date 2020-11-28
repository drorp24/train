import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: { mode: 'light', lang: 'en' },
  reducers: {
    toggleMode: state => ({
      ...state,
      mode: state.mode === 'light' ? 'dark' : 'light',
    }),
    toggleLang: state => ({
      ...state,
      lang: state.lang === 'en' ? 'he' : 'en',
    }),
  },
})

const { actions, reducer } = appSlice

export default reducer
export const { toggleMode, toggleLang } = actions
