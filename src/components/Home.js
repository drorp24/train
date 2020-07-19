import React from 'react'

import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <h2>Home</h2>
      <ul>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/topics'>Topics</Link>
        </li>
      </ul>
    </div>
  )
}
