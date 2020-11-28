import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
  page: {
    height: '100vh',
  },
}))

const Page = ({ children, ...rest }) => {
  const classes = useStyles()

  return (
    <Paper square className={classes.page} {...rest}>
      {children}
    </Paper>
  )
}

export default Page
