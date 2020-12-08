import React, { memo, createContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMerchants, selectMerchants, reorder } from '../../redux/merchants'

import Load from '../layout/Load'
import Entity from './Entity'

import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
  list: {
    overflow: 'scroll',
    zIndex: 401,
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '-ms-overflow-style': 'none',
    scrollbarWidth: 'none',
  },
}))

const getDroppableStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  paddingTop: '1px', // hack
})

export const ListConfig = createContext({ selector: 'none', fields: 'none' })

const Entities = memo(({ entities }) =>
  entities.map((entity, index) => (
    <Entity key={entity.id} {...{ entity, index }} />
  ))
)

const List = ({ listConfig }) => {
  const { entities, loading, error } = useSelector(selectMerchants)
  const empty = !entities.length

  const dispatch = useDispatch()
  useEffect(() => {
    if (empty) dispatch(fetchMerchants())
  }, [dispatch, empty])

  const onDragEnd = ({ draggableId, source, destination }) => {
    if (!destination || destination.index === source.index) return

    // ToDo: find out why dispatch(reorder) maps Map re-render

    dispatch(reorder({ draggableId, source, destination }))
  }

  const classes = useStyles()

  return (
    <Paper square elevation={5} className={classes.list}>
      <Load {...{ loading, error, empty }}>
        <ListConfig.Provider value={listConfig}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
              {(
                { innerRef, droppableProps, placeholder },
                { isDraggingOver }
              ) => (
                <div
                  ref={innerRef}
                  style={getDroppableStyle(isDraggingOver)}
                  {...droppableProps}
                >
                  <Entities {...{ entities }} />
                  {placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </ListConfig.Provider>
      </Load>
    </Paper>
  )
}

export default List
