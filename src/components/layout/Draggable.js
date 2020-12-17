import React from 'react'

import { Draggable } from 'react-beautiful-dnd'

import { makeStyles, useTheme } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {},
}))

const MyDraggable = ({
  draggableId,
  index,
  draggableWhileDragging,
  children,
  ...rest
}) => {
  const classes = useStyles()
  const theme = useTheme()

  const getDraggableStyle = (isDragging, draggablePropsStyle) => ({
    ...(isDragging && {
      ...(draggableWhileDragging || theme.interaction.draggableWhileDragging),
    }),
    ...draggablePropsStyle,
  })

  return (
    <Draggable {...{ draggableId, index }} className={classes.root} {...rest}>
      {({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => (
        <div
          ref={innerRef}
          {...draggableProps}
          {...dragHandleProps}
          style={getDraggableStyle(isDragging, draggableProps.style)}
        >
          {children}
        </div>
      )}
    </Draggable>
  )
}

export default MyDraggable
