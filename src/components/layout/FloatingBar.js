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
  const droppableId = 'floatingBar'
  const draggables = useSelector(store => store.app[droppableId])

  const classes = useStyles()

  const empty = !draggables.length

  return (
    <Droppable droppableId={droppableId}>
      <AppBar
        position="relative"
        elevation={0}
        className={classes.appBar}
        style={{ visibility: empty ? 'hidden' : 'visible' }}
      >
        {draggables.map((draggableId, index) => {
          const Component = draggableComponent(draggableId)
          return (
            <Draggable
              {...{ draggableId, index }}
              key={`${droppableId} ${draggableId}}`}
            >
              <Component />
            </Draggable>
          )
        })}
      </AppBar>
    </Droppable>
  )
}

export default FloatingBar
