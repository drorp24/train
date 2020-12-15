import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: { mode: 'light', lang: 'en', filters: 'filtersBar' },
  reducers: {
    toggleMode: state => ({
      ...state,
      mode: state.mode === 'light' ? 'dark' : 'light',
    }),
    toggleLang: state => ({
      ...state,
      lang: state.lang === 'en' ? 'he' : 'en',
    }),
    positionFilters: (state, { payload }) => {
      console.log('payload: ', payload)
      console.log('typeof payload: ', typeof payload)
      return {
        ...state,
        filters: payload,
      }
    },
  },
})

const { actions, reducer } = appSlice

export default reducer
export const { toggleMode, toggleLang, positionFilters } = actions
