import React, { Memo } from 'react'
import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import DragIndicator from '@material-ui/icons/DragIndicator'

const useStyles = makeStyles(theme => ({
  bar: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: theme.layout.sideBarPadding,
    '& > *': {
      margin: theme.spacing(0.5),
    },
    borderRadius: theme.layout.borderRadius,
    background: theme.palette.background.sideBar,
  },
  dragHandleIcon: {
    color: theme.palette.action.active,
    position: 'absolute',
    right: '28px', // to align it with the cards' action icons, which are positioned with px
  },
}))

// ToDo: find out why Memo throws and fix it
// else this component would be re-rendered hundres of times each second
const Bar = ({ isDragging, children }) => {
  const classes = useStyles()
  const floatingBarPopulated = useSelector(
    store => store.app.floatingBar.length
  )
  const elevation = isDragging || floatingBarPopulated ? 3 : 0

  return (
    <AppBar elevation={elevation} position="relative" className={classes.bar}>
      {children}
      <DragIndicator className={classes.dragHandleIcon} />
    </AppBar>
  )
}

export default Bar
