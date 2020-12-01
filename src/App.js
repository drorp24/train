import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import ProtectedRoute from './components/ProtectedRoute'
import { ApolloProvider } from '@apollo/client'
import client from './apollo/client'

import SimulateError from './components/SimulateError'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './components/Home'
import Login from './components/Login'
import AppBar from './components/AppBar'
import SnackBar from './components/Snackbar'
import Page from './components/Page'
import Merchants from './components/Merchants'

import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import useTheme from './styling/useTheme'
import Language from './components/Language'

export default function App() {
  const { mode, lang } = useSelector(store => store.app)
  const direction = lang === 'he' ? 'rtl' : 'ltr'
  const theme = useTheme(mode, direction)

  useEffect(() => {
    document.body.setAttribute('dir', direction)
  }, [direction])

  return (
    <>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ErrorBoundary>
            <Router>
              <Language lang={lang}>
                <Page>
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
                  <Route path="/merchants">
                    <Merchants />
                  </Route>
                </Page>
              </Language>
              <SnackBar />
            </Router>
          </ErrorBoundary>
        </ThemeProvider>
      </ApolloProvider>
    </>
  )
}
