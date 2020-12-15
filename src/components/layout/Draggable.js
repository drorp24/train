import React, { forwardRef } from 'react'

import { Draggable } from 'react-beautiful-dnd'

import { makeStyles, useTheme } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {},
}))

const MyDraggable = forwardRef(
  (
    {
      source: { droppableId, index } = { index: 0 },
      draggableId,
      destinations,
      styleWhileDragging,
      children,
      ...rest
    },
    ref
  ) => {
    console.log('at Draggable. ref: ', ref)

    const classes = useStyles()
    const theme = useTheme()

    const getDraggableStyle = (isDragging, draggablePropsStyle) => {
      return {
        ...(isDragging && {
          ...(styleWhileDragging || theme.interaction.draggableWhileDragging),
        }),
        ...draggablePropsStyle,
      }
    }

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
)

export default MyDraggable
