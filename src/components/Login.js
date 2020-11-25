import React from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../redux/users'
import { useForm } from 'react-hook-form'

import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

// !  login
//
// ? Declarative, depends on 'loggedIn' state
// Login is the gatekeeper component in charge of openning or closing the gate.
// Though it's the Login component that triggers the async api that checks the login/password,
// it doesn't await anything (it couldn't if it wanted to: the dispatch call itself in synchronos).
//
// Instead, it listen to the 'loggedIn' state (1) and returns a different component according to whethe rthe user is loggedIn or not:
// - LoggedIn - returns a <Redirect /> component (2), the target of which is what the router's state saved in 'from' (3):
//              the original destination the user wanted to reach
// - not loggedIn - returns the form ,whose submit button initiates that dispatch of the api that checks the login/password
//
// Notes:
// (1) That 'loggedIn' state in itself is the future outcome of the dispatch call Login has made, however Login doesn't await anything but responds to state changes.
// (2) It could alternatively call history.push imperatively, but I preferred staying declarative, so I'm returning a component instead.
// (3) React router allows keeping a state, utilized here to remember the url originally requested by the user before being redirected to /login.
//
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function Login() {
  const loggedIn = useSelector(store => !!store.users.loggedIn.username)
  const dispatch = useDispatch()
  const classes = useStyles()
  const { register, handleSubmit, errors } = useForm()
  const { state } = useLocation()

  const onSubmit = ({ username, password }) => {
    dispatch(fetchUser({ username, password }))
  }

  if (loggedIn) {
    return <Redirect to={state?.from || '/'} />
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classes.form}
          noValidate
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User name"
            name="username"
            autoComplete="username"
            autoFocus
            inputRef={register({ required: true })}
            error={!!errors.username}
            helperText={errors.username && 'User name is required'}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={register({ required: true })}
            error={!!errors.password}
            helperText={errors.password && 'Password is required'}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  )
}
