import React from 'react'

import { Droppable } from 'react-beautiful-dnd'

import Filters from './Filters'
import debounce from '../../utility/debounce'
import { makeStyles, useTheme } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {},
}))

const MyDroppable = ({
  droppableId,
  droppableWhileDraggingOver,
  draggableWhileDragging,
  children,
  ...rest
}) => {
  const classes = useStyles()
  const theme = useTheme()

  const getDroppableStyle = debounce(isDraggingOver => ({
    height: '100%',
    width: '100%',
    ...(isDraggingOver && {
      ...(droppableWhileDraggingOver ||
        theme.interaction.droppableWhileDraggingOver),
    }),
  }))

  // if toolbar ever contains more than one bar, iterate over them
  // currently it includes 'Filters' only hence it is hard - coded
  return (
    <Droppable
      droppableId={droppableId}
      renderClone={(
        { draggableProps, dragHandleProps, innerRef },
        { isDragging },
        { draggableId }
      ) => (
        <div {...draggableProps} {...dragHandleProps} ref={innerRef}>
          <Filters {...{ isDragging }} />
        </div>
      )}
    >
      {({ innerRef, droppableProps, placeholder }, { isDraggingOver }) => (
        <div
          ref={innerRef}
          {...droppableProps}
          style={getDroppableStyle(isDraggingOver)}
          className={classes.root}
          {...rest}
        >
          {children}
          {placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default MyDroppable
