// import React from 'react'
import React, { useEffect, useState } from 'react'

// import { unwrapResult } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'

import { fetchTodoByUserId, clear } from '../redux/todo'
import Link from './Link'
import TextField from '@material-ui/core/TextField'

const Todo = () => {
  const { entities, loading, error } = useSelector(state => state.todo)
  const dispatch = useDispatch()
  const [userId, setUserId] = useState(1)

  const updateUserId = ({ target: { value } }) => {
    setUserId(value)
  }

  useEffect(() => {
    const fetchUserTodos = async () => {
      try {
        // I'm not 'awaiting' the response as I don't need to place the resulting records in the component's state
        // Instead I'm taking the records directly from redux
        // I'm merely triggering the dispatch upon component mount
        if (userId && userId > 0) {
          dispatch(clear())
          dispatch(fetchTodoByUserId(userId))
        }
        // unwrapResult = extract the payload or error from the result
        // I don't need it here since redux has already unwrapped the entities out of the paykiad
        // const todos = unwrapResult(fetchResult)
      } catch (error) {
        console.error('Failure! error:', error)
      }
    }
    fetchUserTodos()
  }, [dispatch, userId])

  if (loading !== 'idle') return <p>Loading...</p>
  if (error) return <p>Error...</p>
  if (!entities || entities.lenghth === 0) return <p>No todos for this user!</p>

  return (
    <div>
      <div>
        <Link to='/home'>Back Home</Link>
      </div>
      <div>
        <TextField value={userId} onChange={updateUserId}></TextField>
      </div>
      <div>
        <h2>ToDos for user {userId}</h2>
      </div>
      {entities.map(({ title, completed, id }) => (
        <div key={id}>{title}</div>
      ))}
    </div>
  )
}

export default Todo
