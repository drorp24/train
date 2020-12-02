import React from 'react'

import AppBar from './AppBar'
import UnderAppBar from './UnderAppBar'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
  page: {
    height: '100vh',
    display: 'flex',
  },
  pageMessage: {
    alignSelf: 'center',
    width: '100%',
    textAlign: 'center',
  },
}))

// Page handles loading, error & empty so its callers won't have to
const Page = ({
  appBar = false,
  loading,
  error,
  length,
  children,
  ...rest
}) => {
  const classes = useStyles()

  const PageContent = () => {
    if (loading === 'pending')
      return (
        <div className={classes.pageMessage}>
          <CircularProgress />
        </div>
      )
    if (error)
      return (
        <div className={classes.pageMessage}>
          <Typography variant="h2">Something went wrong...</Typography>
        </div>
      )
    if (!length)
      return (
        <div className={classes.pageMessage}>
          <Typography variant="h2">Nothing here, mate!</Typography>
        </div>
      )
    if (appBar)
      return (
        <>
          <AppBar />
          <UnderAppBar>{children}</UnderAppBar>
        </>
      )
    return <>{children}</>
  }

  // ToDo: add mobile-like app bar, covering list only
  return (
    <Paper square className={classes.page} {...rest}>
      <PageContent />
    </Paper>
  )
}
export default Page
