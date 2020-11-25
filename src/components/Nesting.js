import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import Link from './Link'
import Topic from './Topic'

export default function Nesting() {
  let match = useRouteMatch()
  console.log('Topics match: ', match)

  return (
    <div>
      <h2>Route Nesting</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
            that build on the /topics URL path. You can think of the
            2nd <Route> here as an "index" page for all topics, or
            the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        {/* <Route path={match.path}></Route> */}
      </Switch>

      <Link to="/">Back Home</Link>
    </div>
  )
}
