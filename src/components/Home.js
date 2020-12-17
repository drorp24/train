// import React from 'react'
import React, { createContext, useCallback } from 'react'

import Page from './layout/Page'
import List from './list/List'
import Map from './Map'

export const GeoContext = createContext({
  geo: { map: null },
  setMap: null,
})

const Home = () => {
  const listConfig = {
    selector: 'merchants',
    fields: {
      en: ['id', 'name', 'address'],
      he: ['id', 'name_he', 'address_he'],
    },
  }

  let geo = { map: null }

  const setMap = useCallback(
    inputMap => {
      geo.map = inputMap
    },
    [geo.map]
  )

  // ToDo: pass entire component for both menuBar and filterBar, not just boolean indication; just as sideBar and main.
  // ToDo: and remove their logic from Page
  // ToDo: extract out the draggable/droppable containers

  return (
    <GeoContext.Provider value={{ geo, setMap }}>
      <Page menuBar toolBar list={<List {...{ listConfig }} />} map={<Map />} />
    </GeoContext.Provider>
  )
}

export default Home
