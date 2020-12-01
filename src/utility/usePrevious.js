import { useRef, useEffect } from 'react'

// return the value passed-in in a previous call
// https://blog.logrocket.com/how-to-get-previous-props-state-with-react-hooks/

export default function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}
