// import React from 'react'
import React from 'react'

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
  const classes = useStyles()

  return (
    <UnderAppBar className={classes.home}>
      <List />
      <Map />
    </UnderAppBar>
  )
}

export default Home
