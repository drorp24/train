import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { increment, decrement } from '../redux/counter'
import Link from './Link'

const Counter = () => {
  const dispatch = useDispatch()
  const counter = useSelector(state => state.counter.value)
  return (
    <div>
      <h2>Counter</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <h3>{`Counter value is ${counter}`}</h3>
      <Link to='/home'>Back Home</Link>
    </div>
  )
}

export default Counter
