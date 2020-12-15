import React from 'react'
import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'

const useStyles = makeStyles(theme => ({
  filtersBar: {
    backgroundColor: theme.palette.background.sideBar,
    padding: theme.layout.sideBarPadding,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
    borderRadius: theme.layout.borderRadius,
  },
  chip: {
    backgroundColor: theme.palette.background.paper,
  },
  deleteIcon: {
    margin: ({ lang }) => (lang === 'en' ? '0 5px 0 -6px' : '0 -6px 0 5px'),
  },
}))

const FiltersBar = ({ style }) => {
  const { lang } = useSelector(store => store.app)
  const classes = useStyles({ lang })

  const handleDelete = () => {
    console.info('You clicked the delete icon.')
  }

  const handleClick = () => {
    console.info('You clicked the Chip.')
  }

  return (
    <div style={style} className={classes.filtersBar}>
      <Chip
        label="Filter A"
        onClick={handleClick}
        onDelete={handleDelete}
        className={classes.chip}
        classes={{ deleteIcon: classes.deleteIcon }}
      />
      <Chip
        label="Filter B"
        onClick={handleClick}
        onDelete={handleDelete}
        className={classes.chip}
        classes={{ deleteIcon: classes.deleteIcon }}
      />
      <Chip
        label="Filter C"
        onClick={handleClick}
        onDelete={handleDelete}
        className={classes.chip}
        classes={{ deleteIcon: classes.deleteIcon }}
      />
    </div>
  )
}

export default FiltersBar
