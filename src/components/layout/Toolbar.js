import React from 'react'

import Draggable from './Draggable'
import Droppable from './Droppable'
import { draggableComponent } from '../../utility/dragAndDrop'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {},
}))

const ToolBar = ({ draggables }) => {
  const droppableId = 'toolBar'

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Droppable {...{ droppableId }}>
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
      </Droppable>
    </div>
  )
}

export default ToolBar
