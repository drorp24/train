import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from '../redux/store'

import { act } from 'react-dom/test-utils'

import Counter from './Counter'

let container = null
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

it('Initializes correctly', () => {
  act(() => {
    render(
      <Provider store={store}>
        <Router>
          <Counter />
        </Router>
      </Provider>,
      container,
    )
  })
  expect(container.querySelector('h3').textContent).toBe('Counter value is 0')
})

it('Increases correctly', () => {
  act(() => {
    render(
      <Provider store={store}>
        <Router>
          <Counter />
        </Router>
      </Provider>,
      container,
    )
  })
  const increaseButton = container.querySelector('[data-testid=increment]')
  increaseButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  expect(container.querySelector('h3').textContent).toBe('Counter value is 1')
})
