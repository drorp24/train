// import React from 'react'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTodo, clear } from '../redux/todo'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
  list: {
    overflow: 'scroll',
    zIndex: 401,
  },
}))

const List = () => {
  const { entities, loading, error } = useSelector(state => state.todo)
  const dispatch = useDispatch()
  const classes = useStyles()

  useEffect(() => {
    dispatch(clear())
    dispatch(fetchTodo())
  }, [dispatch])

  if (loading !== 'idle') return <p>Loading...</p>
  if (error) return <p>Error...</p>
  if (!entities || entities.lenghth === 0) return <p>No todos for this user!</p>

  return (
    <Paper square elevation={5} className={classes.list}>
      {entities.map(({ title, completed, id }) => (
        <div key={id}>{title}</div>
      ))}
    </Paper>
  )
}

export default List
