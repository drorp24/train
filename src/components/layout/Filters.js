import React, { Memo } from 'react'
import { useSelector } from 'react-redux'

import Bar from './Bar'

import { makeStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'

const useStyles = makeStyles(theme => ({
  chip: {
    backgroundColor: theme.palette.background.paper,
  },
  deleteIcon: {
    margin: ({ lang }) => (lang === 'en' ? '0 5px 0 -6px' : '0 -6px 0 5px'),
  },
}))

// ToDo: find out why Memo throws and fix it
// else this component would be re-rendered hundres of times each second
const Filters = ({ isDragging }) => {
  const { lang } = useSelector(store => store.app)
  const classes = useStyles({ lang })

  const handleDelete = () => {
    console.info('You clicked the delete icon.')
  }

  const handleClick = () => {
    console.info('You clicked the Chip.')
  }

  return (
    <Bar {...{ isDragging }}>
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
    </Bar>
  )
}

export default Filters
