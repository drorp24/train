import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    mode: 'light',
    lang: 'en',
    toolBar: ['filters'],
    floatingBar: [],
  },
  reducers: {
    toggleMode: state => ({
      ...state,
      mode: state.mode === 'light' ? 'dark' : 'light',
    }),
    toggleLang: state => ({
      ...state,
      lang: state.lang === 'en' ? 'he' : 'en',
    }),
    relocate: (state, { payload: { draggableId, source, destination } }) => {
      // pseudo-mutation, Immer style
      state[source.droppableId] = state[source.droppableId]?.filter(
        draggable => draggable !== draggableId
      )
      if (destination.droppableId === 'list')
        destination.droppableId = 'toolBar' // user occasionally misses the 'toolbar' droppable, hitting 'list' instead
      state[destination.droppableId].push(draggableId)
    },
  },
})

const { actions, reducer } = appSlice

export default reducer
export const { toggleMode, toggleLang, relocate } = actions
