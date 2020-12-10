// handles loading, error & empty states consistently for any loaded data
import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

const Load = ({ loading, error, empty, children, ...rest }) => {
  const classes = useStyles()

  const Content = () =>
    loading === 'pending' ? (
      <CircularProgress />
    ) : error ? (
      <Typography variant="h5">Something went wrong...</Typography>
    ) : empty ? (
      <Typography variant="h5">Nothing here, mate!</Typography>
    ) : (
      <>{children}</>
    )

  return (
    <div className={classes.container} {...rest}>
      <Content {...rest} />
    </div>
  )
}
export default Load
