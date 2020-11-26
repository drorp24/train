// import React from 'react'
import React from 'react'

import Page from './Page'
import List from './List'
import Map from './Map'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  home: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
  },
}))

const Home = () => {
  const classes = useStyles()

  return (
    <Page className={classes.home}>
      <List />
      <Map />
    </Page>
  )
}

export default Home
