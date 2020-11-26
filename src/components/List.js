// import React from 'react'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTodoByUserId, clear } from '../redux/todo'

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
      if (userId && userId > 0) {
        dispatch(clear())
        dispatch(fetchTodoByUserId(userId))
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
