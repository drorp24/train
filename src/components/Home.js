// import React from 'react'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMerchants } from '../redux/merchants'

import UnderAppBar from './UnderAppBar'
import List from './List'
import Map from './Map'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  home: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    height: '100%',
  },
}))

const Home = () => {
  // List component is generic
  const listConfig = {
    selector: 'merchants',
    fields: {
      en: ['id', 'name', 'address'],
      he: ['id', 'name_he', 'address_he'],
    },
  }

  const classes = useStyles()
  const dispatch = useDispatch()
  // ToDo: 'reselect' or (better) createEntityAdapter

  const { entities, loading, error } = useSelector(
    state => state[listConfig.selector]
  )
  // ToDo: check if apollo caches and de-dupes results
  useEffect(() => {
    if (!entities.length) dispatch(fetchMerchants())
  }, [dispatch, entities.length])

  if (loading !== 'idle') return <p>Loading...</p>
  if (error) return <p>Error...</p>
  if (!entities || entities.lenghth === 0) return <p>No records</p>

  return (
    <UnderAppBar className={classes.home}>
      <List {...{ listConfig, entities }} />
      <Map />
    </UnderAppBar>
  )
}

export default Home
