// d&d configuration
import { relocate } from '../redux/app'
import { reorder } from '../redux/merchants'

import Entity from '../../src/components/list/Entity'
import Filters from '../../src/components/layout/Filters'

const draggable = {
  entity: {
    component: Entity,
  },
  filters: {
    component: Filters,
  },
}

const droppable = {
  list: {
    destinations: ['list'],
    action: reorder,
    draggables: ['entity'],
  },
  toolBar: {
    destinations: ['floatingBar'],
    action: relocate,
    draggables: ['filters'],
  },
  floatingBar: {
    destinations: ['toolBar'],
    action: relocate,
    draggables: ['filters'],
  },
}

export const validDestination = (source, destination) =>
  droppable[source.droppableId]['destinations'].includes(
    destination.droppableId
  )

export const onDragEnd = dispatch => ({ draggableId, source, destination }) => {
  console.log('source: ', source)
  console.log('destination: ', destination)
  console.log('draggableId: ', draggableId)

  if (
    !destination ||
    !validDestination(source, destination) ||
    (source.droppableId === destination.droppableId &&
      source.index === destination.index)
  )
    return

  const { action } = droppable[source.droppableId]
  dispatch(action({ draggableId, source, destination }))
}

export const draggableIds = droppableId => droppable[droppableId].draggables
export const draggableComponent = draggableId =>
  draggable[draggableId].component
