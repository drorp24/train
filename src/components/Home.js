// import React from 'react'
import React, { createContext, useCallback } from 'react'

import Page from './layout/Page'
import List from './list/List'
import Map from './Map'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  home: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    height: '100%',
  },
}))

export const GeoContext = createContext({
  geo: { map: null },
  setMap: null,
})

const Home = () => {
  const listConfig = {
    // List component is generic
    selector: 'merchants',
    fields: {
      en: ['id', 'name', 'address'],
      he: ['id', 'name_he', 'address_he'],
    },
  }

  const classes = useStyles()
  // ToDo: 'reselect' or (better) createEntityAdapter

  let geo = { map: null }

  const setMap = useCallback(
    inputMap => {
      geo.map = inputMap
    },
    [geo.map]
  )

  return (
    <Page appBar>
      <div className={classes.home}>
        <GeoContext.Provider value={{ geo, setMap }}>
          <List {...{ listConfig }} />
          <Map />
        </GeoContext.Provider>
      </div>
    </Page>
  )
}

export default Home
