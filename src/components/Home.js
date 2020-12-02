// import React from 'react'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMerchants } from '../redux/merchants'

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

  const { entities, loading, error } = useSelector(
    state => state[listConfig.selector]
  )
  // ToDo: check if apollo caches and de-dupes results
  useEffect(() => {
    if (!entities.length) dispatch(fetchMerchants())
  }, [dispatch, entities.length])

  const { length } = entities

  return (
    <Page appBar {...{ loading, error, length }}>
      <div className={classes.home}>
        <List {...{ listConfig, entities }} />
        <Map />
      </div>
    </Page>
  )
}

export default Home
