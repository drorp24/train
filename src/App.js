import React from 'react'

import Home from './components/Home'
import SimulateError from './components/SimulateError'
import Nesting from './components/Nesting'
import Counter from './components/Counter'
import ErrorBoundary from './components/ErrorBoundary'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Switch>
          <Route path='/simulateerror'>
            <SimulateError />
          </Route>
          <Route path='/nesting'>
            <Nesting />
          </Route>
          <Route path='/counter'>
            <Counter />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Router>
    </ErrorBoundary>
  )
}
