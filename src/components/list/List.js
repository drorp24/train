import React, { memo, createContext } from 'react'
import { useDispatch } from 'react-redux'
import { reorder } from '../../redux/merchants'

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
  entities.map(({ id }, index) => <Entity key={id} {...{ id, index }} />)
)

const List = ({ listConfig, entities }) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const onDragEnd = ({ draggableId, source, destination }) => {
    if (!destination || destination.index === source.index) return

    // ToDo: fix
    // dispatch(reorder({ draggableId, source, destination }))
  }

  return (
    <Paper square elevation={5} className={classes.list}>
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
    </Paper>
  )
}

export default List
