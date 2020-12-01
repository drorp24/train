// import React from 'react'
import React, { memo, createContext, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reorder } from '../redux/merchants'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'

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

const getDraggableStyle = (isDragging, draggableStyle, mode, lang) => ({
  background: isDragging ? 'lightgreen' : mode === 'light' ? 'white' : '#333',
  ...draggableStyle,
})

const getDroppableStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  paddingTop: '1px', // hack
})

const ListConfig = createContext({})

// ToDo: use createEntityAdapter / reselect / memoize / key to directly aceess rather than search with every drag
const Entity = ({ id, index }) => {
  const { mode, lang } = useSelector(store => store.app)
  const draggableId = String(id)
  const config = useContext(ListConfig)
  const {
    selector,
    fields: { [lang]: lfields },
  } = config

  const entity = useSelector(store =>
    store[selector].entities?.find(entity => entity.id === id)
  )

  if (entity && entity.position) {
    const [from, to] = [
      entity.position.source?.index,
      entity.position.destination?.index,
    ]
    var direction = from < to ? 'down' : from > to ? 'up' : null
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
          style={getDraggableStyle(
            isDragging,
            draggableProps.style,
            mode,
            lang
          )} // must be last
        >
          <div key={id}>
            {lfields.map((field, index) => {
              return <p key={index}>{entity[field]}</p>
            })}
            {direction && (
              <p>
                {direction === 'up' ? (
                  <ArrowUpwardIcon />
                ) : (
                  <ArrowDownwardIcon />
                )}
              </p>
            )}
          </div>
        </div>
      )}
    </Draggable>
  )
}

const Entities = memo(({ entities }) =>
  entities.map(({ id }, index) => <Entity key={id} {...{ id, index }} />)
)

const List = ({ listConfig, entities }) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const onDragEnd = ({ draggableId, source, destination }) => {
    if (!destination || destination.index === source.index) return

    dispatch(reorder({ draggableId, source, destination }))
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
