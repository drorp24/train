import React, { forwardRef } from 'react'

import { Droppable } from 'react-beautiful-dnd'

import { makeStyles, useTheme } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {},
}))

const MyDroppable = forwardRef(
  ({ droppableId, styleWhileDraggingOver, children, ...rest }, ref) => {
    console.log('at MyDroppable. ref: ', ref)
    const classes = useStyles()
    const theme = useTheme()

    const getDroppableStyle = isDraggingOver => ({
      height: '100%',
      width: '100%',
      ...(isDraggingOver && {
        ...(styleWhileDraggingOver || theme.interaction.droppableHint),
      }),
    })

    return (
      <Droppable droppableId={droppableId} className={classes.root} {...rest}>
        {({ innerRef, droppableProps, placeholder }, { isDraggingOver }) => {
          console.log('placeholder: ', placeholder)
          return (
            <div
              ref={innerRef}
              style={getDroppableStyle(isDraggingOver)}
              {...droppableProps}
            >
              {children}
              {placeholder}
            </div>
          )
        }}
      </Droppable>
    )
  }
)

export default MyDroppable
