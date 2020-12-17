import React from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { toggleMode, toggleLang } from '../../redux/app'

import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import Logout from '../Logout'
import IconButton from '@material-ui/core/IconButton'
import DarkIcon from '@material-ui/icons/Brightness4'
import LightIcon from '@material-ui/icons/Brightness7'
import LangIcon from '@material-ui/icons/Language'
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
  toolbar: {
    padding: theme.layout.sideBarPadding,
    flexWrap: 'wrap',
    // uncomment to check alignment
    // '& > *': {
    //   border: '1px solid',
    //   borderRadius: 0,
    // },
  },
  title: {
    flexGrow: 1,
    textTransform: 'uppercase',
    fontSize: '1rem',
  },
  mode: {
    display: 'flex',
    fontSize: '1rem',
    justifyContent: 'space-around',
    fontFamily: 'inherit',
  },
  lang: {
    fontSize: '0.75rem',
    position: 'absolute',
    top: '2.2rem',
  },
}))

const MenuBar = () => {
  const classes = useStyles()

  const { mode, lang } = useSelector(store => store.app)
  const dispatch = useDispatch()
  const changeMode = () => dispatch(toggleMode())
  const changeLang = () => dispatch(toggleLang())

  const location = useLocation()
  const { pathname } = location
  if (pathname === '/login') return null

  const pathName =
    pathname.length === 1
      ? 'Home'
      : pathname.substring(1, 2).toUpperCase() + pathname.substring(2)

  return (
    <AppBar position="relative" elevation={0} className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge={lang === 'he' ? 'end' : 'start'}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          <span>{pathName}</span>
        </Typography>
        <IconButton onClick={changeMode} className={classes.mode}>
          {mode === 'dark' ? <LightIcon /> : <DarkIcon />}
        </IconButton>
        <IconButton onClick={changeLang} className={classes.mode}>
          <LangIcon />
          <span className={classes.lang}>{lang === 'en' ? 'עב' : 'en'}</span>
        </IconButton>
        <Logout />
      </Toolbar>
    </AppBar>
  )
}

export default MenuBar
