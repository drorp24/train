import React from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.contrast,
  },
}))

const MyLink = ({ children, ...props }) => {
  const classes = useStyles()
  return (
    <Link className={classes.link} {...props}>
      {children}
    </Link>
  )
}

export default MyLink
