import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

// ! ProtectedRoute
//
// ? use render props instead of children
// According to https://ui.dev/react-router-v5-protected-routes-authentication/:
// "Using render instead of children allows us to re-check if the user is authenticated every time the Route matches;
// If instead we used the children element, React Router would only ever see the initial state of fakeAuth.isAuthenticated".
//
// I think this has to do with the fact they are using a fakeAuth. I would probably notice changes in auth even if I did use children,
// since I'm listening to a useSelector. But I didn't want to spend time checking this.
//
// Another nicety of using render props albeit not compelling is that React passes to a Route's render prop the current location,
// which we need to preserve in the route's state, saving me from grabbing it from useLocation.

const ProtectedRoute = ({ children, ...rest }) => {
  const loggedIn = useSelector(store => !!store.users.loggedIn.username)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedIn ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  )
}

export default ProtectedRoute
