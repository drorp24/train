import React from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleMode, toggleLanguage } from '../redux/app'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import Logout from './Logout'
import IconButton from '@material-ui/core/IconButton'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
import Brightness3Icon from '@material-ui/icons/Brightness3'
import LanguageIcon from '@material-ui/icons/Language'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  mode: {
    color: 'white',
    display: 'flex',
    width: '5rem',
    fontSize: '1rem',
    justifyContent: 'space-around',
  },
}))

export default function ButtonAppBar() {
  const { mode, language } = useSelector(store => store.app)
  console.log('mode: ', mode)
  const dispatch = useDispatch()
  const changeMode = () => dispatch(toggleMode())
  const changeLanguage = () => dispatch(toggleLanguage())
  const classes = useStyles()

  const location = useLocation()
  const pageName = location =>
    location.length === 1
      ? 'Home'
      : location.substring(1, 2).toUpperCase() + location.substring(2)

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {pageName(location.pathname)}
          </Typography>
          <IconButton onClick={changeMode} className={classes.mode}>
            {mode === 'dark' ? <WbSunnyIcon /> : <Brightness3Icon />}
          </IconButton>
          <IconButton onClick={changeLanguage} className={classes.mode}>
            <LanguageIcon />
            <span>{language === 'en' ? 'עב' : 'en'}</span>
          </IconButton>
          <Logout />
        </Toolbar>
      </AppBar>
    </div>
  )
}
