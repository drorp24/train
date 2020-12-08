import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import ProtectedRoute from './components/layout/ProtectedRoute'
import { ApolloProvider } from '@apollo/client'
import client from './apollo/client'
import { Helmet } from 'react-helmet'

import SimulateError from './components/layout/SimulateError'
import ErrorBoundary from './components/layout/ErrorBoundary'
import Home from './components/Home'
import Login from './components/Login'
import SnackBar from './components/layout/Snackbar'
import Merchants from './components/Merchants'

import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import useTheme from './styling/useTheme'
import Language from './components/layout/Language'

export default function App() {
  const { mode, lang } = useSelector(store => store.app)
  const direction = lang === 'he' ? 'rtl' : 'ltr'
  const theme = useTheme(mode, direction)

  return (
    <>
      <Helmet>
        <body dir={direction} />
      </Helmet>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ErrorBoundary>
            <Router>
              <Language lang={lang}>
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
                  <Route path="/merchants">
                    <Merchants />
                  </Route>
                </Switch>
              </Language>
              <SnackBar />
            </Router>
          </ErrorBoundary>
        </ThemeProvider>
      </ApolloProvider>
    </>
  )
}
