import React from 'react'
import { useSelector } from 'react-redux'
import { Draggable, Droppable } from 'react-beautiful-dnd'

import FiltersBar from './FiltersBar'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'

const useStyles = makeStyles(theme => {
  const {
    layout: { filtersBarHeight, sideBarWidth },
  } = theme
  return {
    root: {
      visibility: ({ filtersBarPosition }) =>
        filtersBarPosition === 'floatingBar' ? 'visible' : 'hidden',
      height: `${filtersBarHeight}vh`,
      width: `${sideBarWidth}vw`,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.palette.background.sideBar,
      borderRadius: theme.layout.borderRadius,
    },
  }
})

const FloatingBar = () => {
  const filtersBarPosition = useSelector(store => store.app.filters)
  const classes = useStyles({ filtersBarPosition })

  const getDroppableStyle = isDraggingOver => ({
    // if bg color or anything else needs to be modified while dragging, this is the place
    height: '100%', // required
    width: '100%',
  })

  return (
    <Droppable droppableId="floatingBar">
      {({ innerRef, droppableProps, placeholder }, { isDraggingOver }) => (
        <div
          ref={innerRef}
          style={getDroppableStyle(isDraggingOver)}
          {...droppableProps}
        >
          <Draggable draggableId="draggableFloatingBar" index={0}>
            {(
              { innerRef, draggableProps, dragHandleProps },
              { isDragging }
            ) => (
              <div ref={innerRef} {...draggableProps} {...dragHandleProps}>
                <AppBar
                  position="relative"
                  elevation={5}
                  className={classes.root}
                >
                  <FiltersBar />
                </AppBar>
              </div>
            )}
          </Draggable>
          {placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default FloatingBar
