import React from 'react'
import { useLocation } from 'react-router-dom'
import Toolbar from './Toolbar'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexGrow: 1,
    height: '100%',
    backgroundColor: theme.palette.background.sideBar,
  },
}))

const MenuBar = () => {
  const classes = useStyles()

  const location = useLocation()
  const { pathname } = location
  if (pathname === '/login') return null

  const pathName =
    pathname.length === 1
      ? 'Home'
      : pathname.substring(1, 2).toUpperCase() + pathname.substring(2)

  return (
    <AppBar position="relative" elevation={0} className={classes.root}>
      <Toolbar pathName={pathName} />
    </AppBar>
  )
}

export default MenuBar
