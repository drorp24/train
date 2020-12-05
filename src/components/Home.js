// import React from 'react'
import React, { useEffect, createContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMerchants, selectMerchants } from '../redux/merchants'

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

export const GeoContext = createContext({ map: null, setMap: () => {} })

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
  const dispatch = useDispatch()
  // ToDo: 'reselect' or (better) createEntityAdapter

  const { entities, loading, error } = useSelector(selectMerchants)
  const { length } = entities

  // ToDo: check if apollo caches and de-dupes results
  useEffect(() => {
    if (!length) dispatch(fetchMerchants())
  }, [dispatch, length])

  let map = { current: null }

  const setMap = inputMap => {
    map = inputMap
  }

  return (
    <Page appBar {...{ loading, error, length }}>
      <div className={classes.home}>
        <GeoContext.Provider value={{ map, setMap }}>
          <List {...{ listConfig, entities }} />
          <Map />
        </GeoContext.Provider>
      </div>
    </Page>
  )
}

export default Home
