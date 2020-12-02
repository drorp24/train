import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  under: {
    position: 'relative',
    top: `${theme.appBarPortion}%`,
    height: `${100 - theme.appBarPortion}%`,
    width: '100%',
  },
}))

const UnderAppBar = ({ children }) => {
  const classes = useStyles()

  return <div className={classes.under}>{children}</div>
}

export default UnderAppBar
