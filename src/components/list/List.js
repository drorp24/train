import React, { memo, createContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMerchants, selectMerchants, reorder } from '../../redux/merchants'

import Load from '../layout/Load'
import Entity from './Entity'

import { DragDropContext, Droppable } from 'react-beautiful-dnd'

const getDroppableStyle = isDraggingOver => ({
  // if bg color or anything else needs to be modified while dragging, this is the place
  height: '100%', // required
  width: '100%',
})

export const ListConfig = createContext({ selector: 'none', fields: 'none' })

const Entities = memo(({ entities }) =>
  entities.map((entity, index) => (
    <Entity key={entity.id} {...{ entity, index }} />
  ))
)

const List = ({ listConfig }) => {
  const { entities, loading, error } = useSelector(selectMerchants)
  const empty = !entities.length

  const dispatch = useDispatch()
  useEffect(() => {
    if (empty) dispatch(fetchMerchants())
  }, [dispatch, empty])

  const onDragEnd = ({ draggableId, source, destination }) => {
    if (!destination || destination.index === source.index) return

    // ToDo: find out why dispatch(reorder) maps Map re-render

    dispatch(reorder({ draggableId, source, destination }))
  }

  return (
    <Load {...{ loading, error, empty }}>
      <ListConfig.Provider value={listConfig}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {(
              { innerRef, droppableProps, placeholder },
              { isDraggingOver }
            ) => (
              <div
                ref={innerRef}
                style={getDroppableStyle(isDraggingOver)}
                {...droppableProps}
              >
                <Entities {...{ entities }} />
                {placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </ListConfig.Provider>
    </Load>
  )
}

export default List
