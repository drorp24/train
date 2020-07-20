import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import SimulateError from './components/SimulateError'
import Nesting from './components/Nesting'
import Counter from './components/Counter'
import ErrorBoundary from './components/ErrorBoundary'
import ExchangeRates from './components/ExchangeRates'

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Switch>
          <Route path='/rates'>
            <ExchangeRates />
          </Route>
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
