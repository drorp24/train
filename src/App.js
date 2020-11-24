import React, { useMemo } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { useSelector } from 'react-redux'

import Home from './components/Home'
import SimulateError from './components/SimulateError'
import Nesting from './components/Nesting'
import Counter from './components/Counter'
import ErrorBoundary from './components/ErrorBoundary'
import ExchangeRates from './components/ExchangeRates'
import Todo from './components/Todo'
import Login from './components/Login'

import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../src/styling/theme'

export default function App() {
  const mode = useSelector(store => store.device.mode)
  // useMemo returns the value, useCallback the function
  const modeTheme = useMemo(() => theme(mode), [mode])

  return (
    <>
      <ThemeProvider theme={modeTheme}>
        <CssBaseline />
        <ErrorBoundary>
          <Router>
            <Switch>
              <ProtectedRoute exact path="/">
                <Home />
              </ProtectedRoute>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/rates">
                <ExchangeRates />
              </Route>
              <Route path="/simulateerror">
                <SimulateError />
              </Route>
              <Route path="/nesting">
                <Nesting />
              </Route>
              <Route path="/counter">
                <Counter />
              </Route>
              <Route path="/todos">
                <Todo />
              </Route>
            </Switch>
          </Router>
        </ErrorBoundary>
      </ThemeProvider>
    </>
  )
}
