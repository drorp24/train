import React, { useMemo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import ProtectedRoute from './components/ProtectedRoute'

import SimulateError from './components/SimulateError'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './components/Home'
import Login from './components/Login'
import AppBar from './components/AppBar'
import SnackBar from './components/Snackbar'

import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../src/styling/theme'

export default function App() {
  const { mode, language } = useSelector(store => store.app)
  const direction = language === 'he' ? 'rtl' : 'ltr'
  const modeTheme = useMemo(() => theme(mode, direction), [mode, direction])

  useEffect(() => {
    document.body.setAttribute('dir', direction)
  }, [direction])

  return (
    <>
      <ThemeProvider theme={modeTheme}>
        <CssBaseline />
        <ErrorBoundary>
          <Router>
            <AppBar />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/simulateerror">
                <SimulateError />
              </Route>
            </Switch>
            <SnackBar />
          </Router>
        </ErrorBoundary>
      </ThemeProvider>
    </>
  )
}
