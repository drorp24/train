import React from 'react'

import Home from './components/Home'
import About from './components/About'
import Topics from './components/Topics'
import Counter from './components/Counter'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/topics'>
          <Topics />
        </Route>
        <Route path='/counter'>
          <Counter />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}
