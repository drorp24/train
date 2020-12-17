import React, { forwardRef } from 'react'

import { Droppable } from 'react-beautiful-dnd'

import { makeStyles, useTheme } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {},
}))

const MyDroppable = ({
  droppableId,
  styleWhileDraggingOver,
  children,
  ...rest
}) => {
  const classes = useStyles()
  const theme = useTheme()

  const getDroppableStyle = isDraggingOver => ({
    height: '100%',
    width: '100%',
    ...(isDraggingOver && {
      ...(styleWhileDraggingOver ||
        theme.interaction.droppableWhileDraggingOver),
    }),
  })

  return (
    <Droppable
      droppableId={droppableId}
      renderClone={(provided, snapshot, rubric) => {
        console.log('snapshot: ', snapshot)
        console.log('rubric: ', rubric)
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            I am clone
          </div>
        )
      }}
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
