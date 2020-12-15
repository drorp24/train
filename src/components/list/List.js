import React, { memo, createContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMerchants, selectMerchants } from '../../redux/merchants'

import Load from '../layout/Load'
import Entity from './Entity'

import { Droppable } from 'react-beautiful-dnd'

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

  const getDroppableStyle = isDraggingOver => ({
    // if bg color or anything else needs to be modified while dragging, this is the place
    height: '100%', // required
    width: '100%',
  })

  return (
    <Load {...{ loading, error, empty }}>
      <ListConfig.Provider value={listConfig}>
        <Droppable droppableId="list" style={{ border: '5px solid orange' }}>
          {({ innerRef, droppableProps, placeholder }, { isDraggingOver }) => (
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
      </ListConfig.Provider>
    </Load>
  )
}

export default List
