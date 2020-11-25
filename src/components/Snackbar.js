import React, { useState } from 'react'
import useNotifications from './useNotifications'

import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  snackbar: {
    minWidth: '25vw',
  },
  alert: {
    width: '100%',
  },
  message: {
    lineHeight: '2',
  },
}))

const Snack = () => {
  const [open, setOpen] = useState(false)
  const { message, severity } = useNotifications(setOpen)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const classes = useStyles()

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={open}
      onClose={handleClose}
      autoHideDuration={3000}
      className={classes.snackbar}
    >
      <MuiAlert
        severity={severity}
        onClose={handleClose}
        className={classes.alert}
      >
        <div className={classes.message}>{message}</div>
      </MuiAlert>
    </Snackbar>
  )
}

export default Snack
