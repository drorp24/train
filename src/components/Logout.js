import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { logout } from '../redux/users'

import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    fontSize: '1rem',
    padding: '0 2rem',
    textTransform: 'uppercase',
    color: theme.palette.secondary.light,
  },
  loginButton: {},
  logoutButton: {
    fontSize: '1rem',
  },
}))

const Logout = () => {
  const username = useSelector(store => store.users.loggedIn.username)
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles({ username })

  const performLogout = () => {
    dispatch(logout())
  }

  const performLogin = () => {
    history.push('/login')
  }

  return (
    <div className={classes.root}>
      {username ? (
        <span className={classes.username}>{username}</span>
      ) : (
        <IconButton className={classes.loginButton} onClick={performLogin}>
          <AccountCircleIcon />
        </IconButton>
      )}

      <IconButton
        className={classes.logoutButton}
        onClick={performLogout}
        disabled={!username}
      >
        <PowerSettingsNewIcon />
      </IconButton>
    </div>
  )
}

export default Logout
