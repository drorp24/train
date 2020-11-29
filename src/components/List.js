// import React from 'react'
import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reorder } from '../redux/todo'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
  entity: {
    padding: '1em',
    margin: '1em',
    border: '1px solid lightgray',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  list: {
    overflow: 'scroll',
    zIndex: 401,
  },
}))

const getDraggableStyle = (isDragging, draggableStyle) => ({
  background: isDragging ? 'lightgreen' : 'white',
  ...draggableStyle,
})

const getDroppableStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  paddingTop: '1px', // hack
})

// ToDo: use reselect / memoize / key by something to not do an O(n) search with every drag
const Entity = ({ title, id, index }) => {
  const draggableId = String(id)
  const entity = useSelector(store =>
    store.entities?.find(entity => entity.id === id)
  )
  if (entity && entity.position) {
    var direction =
      entity.position.source?.index < entity.position.destination?.index
        ? 'down'
        : 'up'
  }
  const classes = useStyles()
  return (
    <Draggable {...{ draggableId, index }}>
      {({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => (
        <div
          className={classes.entity}
          ref={innerRef}
          {...draggableProps}
          {...dragHandleProps}
          style={getDraggableStyle(isDragging, draggableProps.style)} // must be last
        >
          <span>{title}</span>
          <span>{id}</span>
          <span>{index}</span>
          {direction && <span>{direction}</span>}
        </div>
      )}
    </Draggable>
  )
}

const Entities = memo(({ entities }) =>
  entities.map(({ title, id }, index) => (
    <Entity {...{ title, id, index }} key={id} />
  ))
)

const List = ({ entities }) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const onDragEnd = ({ draggableId, source, destination }) => {
    if (!destination || destination.index === source.index) return

    dispatch(reorder({ draggableId, source, destination }))
  }

  return (
    <Paper square elevation={5} className={classes.list}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {({ innerRef, droppableProps, placeholder }, { isDraggingOver }) => (
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
    </Paper>
  )
}

export default List
