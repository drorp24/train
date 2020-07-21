import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import SettingsBrightnessIcon from '@material-ui/icons/SettingsBrightness'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Link from './Link'
import { toggle } from '../redux/device'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}))

export default function Home() {
  const mode = useSelector(store => store.device.mode)
  const dispatch = useDispatch()
  const changeMode = () => dispatch(toggle())
  const classes = useStyles()

  return (
    <div>
      <Button
        variant='contained'
        className={classes.button}
        startIcon={<SettingsBrightnessIcon />}
        onClick={changeMode}
      >
        {mode === 'dark' ? 'light mode' : 'dark mode'}
      </Button>
      <h2>Home</h2>
      <ul>
        <li>
          <Link to='/todos'>Todos (AsyncThunk)</Link>
        </li>
        <li>
          <Link to='/rates'>Exchange Rates (GraphQL)</Link>
        </li>
        <li>
          <Link to='/simulateerror'>Simulate Error (ErrorBoundary)</Link>
        </li>
        <li>
          <Link to='/counter'>Counter (Redux toolkit)</Link>
        </li>
        <li>
          <Link to='/nesting'>Route Nesting (react-router)</Link>
        </li>
      </ul>
    </div>
  )
}
