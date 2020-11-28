import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
  under: {
    position: 'relative',
    top: `${theme.appBarPortion}%`,
    height: `${100 - theme.appBarPortion}%`,
  },
}))

const UnderAppBar = ({ children, ...rest }) => {
  const classes = useStyles()

  return (
    <Paper square elevation={1} className={classes.under}>
      <div {...rest}>{children}</div>
    </Paper>
  )
}

export default UnderAppBar
