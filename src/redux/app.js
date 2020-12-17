import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    mode: 'light',
    lang: 'en',
    filters: 'toolBar',
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
    relocate1: (state, { payload: { draggableId, source, destination } }) => {
      // pseudo-mutating using Immer
      state[source.droppableId] = state[source.droppableId]?.filter(
        draggable => draggable !== draggableId
      )
      if (destination.droppableId === 'list')
        destination.droppableId = 'toolBar' // when user returns the floating bar to place, it frequently hits 'list'
      state[destination.droppableId].push(draggableId)
    },
  },
})

const { actions, reducer } = appSlice

export default reducer
export const { toggleMode, toggleLang, relocate, relocate1 } = actions
