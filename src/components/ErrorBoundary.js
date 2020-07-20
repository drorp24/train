import React from 'react'

import { BrowserRouter as Router, Link } from 'react-router-dom'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    console.log('getDerivedStateFromError')
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.log('componentDidCatch')
    // You can also log the error to an error reporting service
  }

  clearError(e) {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <h1>ErrorBoundary: Something went wrong.</h1>
          <Router>
            <Link to='/' onClick={this.clearError.bind(this)}>
              Back Home
            </Link>
          </Router>
        </>
      )
    }

    return this.props.children
  }
}
