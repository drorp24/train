import React from 'react'

import AppBar from './AppBar'
import UnderAppBar from './UnderAppBar'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
  page: {
    height: '100vh',
    display: 'flex',
  },
}))

// Page handles loading, error & empty so its callers won't have to
const Page = ({ appBar = false, children, ...rest }) => {
  const classes = useStyles()

  const PageContent = () => {
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
