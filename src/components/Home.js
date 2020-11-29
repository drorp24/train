// import React from 'react'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clear, fetchTodo } from '../redux/todo'

import UnderAppBar from './UnderAppBar'
import List from './List'
import Map from './Map'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  home: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    height: '100%',
  },
}))

const Home = () => {
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
    <UnderAppBar className={classes.home}>
      <List entities={entities} />
      <Map />
    </UnderAppBar>
  )
}

export default Home
