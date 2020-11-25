import React from 'react'

import Link from './Link'

export default function Home() {
  return (
    <div>
      <h2>Home</h2>
      <ul>
        <li>
          <Link to="/todos">Todos (AsyncThunk)</Link>
        </li>
        <li>
          <Link to="/rates">Exchange Rates (GraphQL)</Link>
        </li>
        <li>
          <Link to="/simulateerror">Simulate Error (ErrorBoundary)</Link>
        </li>
        <li>
          <Link to="/counter">Counter (Redux toolkit)</Link>
        </li>
        <li>
          <Link to="/nesting">Route Nesting (react-router)</Link>
        </li>
      </ul>
    </div>
  )
}
