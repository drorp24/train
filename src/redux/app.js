import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: { mode: 'light', lang: 'en', filters: 'toolBar' },
  reducers: {
    toggleMode: state => ({
      ...state,
      mode: state.mode === 'light' ? 'dark' : 'light',
    }),
    toggleLang: state => ({
      ...state,
      lang: state.lang === 'en' ? 'he' : 'en',
    }),
    relocate: (
      state,
      {
        payload: {
          draggableId,
          source,
          destination: { droppableId },
        },
      }
    ) => ({
      ...state,
      [draggableId]: droppableId,
    }),
  },
})

const { actions, reducer } = appSlice

export default reducer
export const { toggleMode, toggleLang, relocate } = actions
