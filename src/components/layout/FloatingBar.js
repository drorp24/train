import React from 'react'
import { useSelector } from 'react-redux'

import { draggableComponent } from '../../utility/dragAndDrop'

import Droppable from './Droppable'
import Draggable from './Draggable'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'

const useStyles = makeStyles(theme => ({
  appBar: {
    height: `${theme.layout.toolBarHeight}vh`,
    width: `${theme.layout.sideBarWidth}vw`,
    borderRadius: theme.layout.borderRadius,
    background: 'none',
  },
}))

const FloatingBar = () => {
  const classes = useStyles()
  const droppableId = 'floatingBar'
  const draggables = useSelector(store =>
    Object.entries(store.app)
      .filter(([key, value]) => value === 'floatingBar')
      .map(item => item[0])
  )
  const empty = !draggables.length

  return (
    <Droppable droppableId={droppableId}>
      <AppBar
        position="relative"
        elevation={0}
        className={classes.appBar}
        style={{ visibility: empty ? 'hidden' : 'visible' }}
      >
        {draggables.map(draggableId => {
          const Component = draggableComponent(draggableId)
          return (
            <Draggable draggableId={draggableId} key={draggableId}>
              <Component />
            </Draggable>
          )
        })}
      </AppBar>
    </Droppable>
  )
}

export default FloatingBar
