import React, { forwardRef } from 'react'

import { Droppable, Draggable } from 'react-beautiful-dnd'

import { makeStyles, useTheme } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {},
}))

const Movable = forwardRef(
  ({ droppableId, index = 0, draggableId, children, ...rest }, ref) => {
    console.log('at Movable. ref: ', ref)
    const classes = useStyles()
    const theme = useTheme()

    const getDroppableStyle = isDraggingOver => ({
      // if bg color or anything else needs to be modified while dragging, this is the place
      height: '100%', // required
      width: '100%',
    })

    const getDraggableStyle = (isDragging, draggablePropsStyle) => {
      return {
        ...(isDragging && {
          background: theme.palette.grey[400],
          color: 'white',
        }),
        ...draggablePropsStyle,
      }
    }

    // ToDo: use forwardRef to have parent access the values set by inner functions
    // ToDo: as setting state will trigger the parent to re-render

    ref.current.symbol = 'circle'
    return (
      <Droppable droppableId={droppableId} className={classes.root} {...rest}>
        {({ innerRef, droppableProps, placeholder }, { isDraggingOver }) => {
          ref.current.isDraggingOver = isDraggingOver

          return (
            <div
              ref={innerRef}
              style={getDroppableStyle(isDraggingOver)}
              {...droppableProps}
            >
              <Draggable {...{ draggableId, index }}>
                {(
                  { innerRef, draggableProps, dragHandleProps },
                  { isDragging }
                ) => {
                  ref.current.isDragging = isDragging
                  return (
                    <div
                      ref={innerRef}
                      {...draggableProps}
                      {...dragHandleProps}
                      style={getDraggableStyle(
                        isDragging,
                        draggableProps.style
                      )}
                    >
                      {children}
                    </div>
                  )
                }}
              </Draggable>
              {placeholder}
            </div>
          )
        }}
      </Droppable>
    )
  }
)

export default Movable
