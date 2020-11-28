import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'

import SimulateError from './components/SimulateError'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './components/Home'
import Login from './components/Login'
import AppBar from './components/AppBar'
import SnackBar from './components/Snackbar'
import Page from './components/Page'

import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import useTheme from './styling/useTheme'
import Language from './components/Language'

export default function App() {
  const { mode, lang } = useSelector(store => store.app)
  const direction = lang === 'he' ? 'rtl' : 'ltr'
  const theme = useTheme(mode, direction)
  console.log('theme: ', theme)

  useEffect(() => {
    document.body.setAttribute('dir', direction)
  }, [direction])

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ErrorBoundary>
          <Router>
            <Language lang={lang}>
              <Page>
                <AppBar />
                <Switch>
                  <ProtectedRoute exact path="/">
                    <Home />
                  </ProtectedRoute>
                  <Route path="/login">
                    <Login />
                  </Route>
                  <Route path="/simulateerror">
                    <SimulateError />
                  </Route>
                </Switch>
              </Page>
            </Language>
            <SnackBar />
          </Router>
        </ErrorBoundary>
      </ThemeProvider>
    </>
  )
}
