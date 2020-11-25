import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export default setOpen => {
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState('')

  const { error } = useSelector(store => store.users)

  useEffect(() => {
    if (error) {
      setOpen(true)
      setMessage('No such user. Please try again')
      setSeverity('error')
    }
  }, [error, setOpen])

  return { message, severity }
}
