// example of using the hook version of the graphql query

import React from 'react'
import { useMerchants } from '../api/useMerchants'

export default function Merchants() {
  const { loading, error, data } = useMerchants()

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log('data: ', data)
  return <div>Successful</div>
}
