import React from 'react'

import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <h2>Home</h2>
      <ul>
        <li>
          <Link to='/simulateerror'>Simulate Error</Link>
        </li>
        <li>
          <Link to='/counter'>Counter</Link>
        </li>
        <li>
          <Link to='/nesting'>Route Nesting</Link>
        </li>
      </ul>
    </div>
  )
}
