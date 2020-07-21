import React, { useState } from 'react'

import Link from './Link'
import { useQuery, gql } from '@apollo/client'

const EXCHANGE_RATES = gql`
  query GetExchangeRates($currency: String!) {
    rates(currency: $currency) {
      currency
      rate
    }
  }
`

export default function ExchangeRates() {
  const [currency, setCurrency] = useState('')
  const [currencyVariable, setCurrencyVariable] = useState('USD')
  const { loading, error, data } = useQuery(EXCHANGE_RATES, {
    variables: { currency: currencyVariable },
  })

  const updateCurrency = ({ target: { value } }) => {
    setCurrency(value)
    if (value.length >= 3) setCurrencyVariable(value)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <>
      <Link to='/home'>Back Home</Link>
      <br />
      <br />

      <div>
        <input type='text' value={currency} onChange={updateCurrency}></input>
      </div>

      {data.rates ? (
        <div>
          <h2>Rates for {currencyVariable}</h2>
          {data.rates.map(({ currency, rate }) => (
            <div key={currency}>
              <p>
                {currency}: {rate}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>{`No rates for ${currency}`}</p>
      )}
    </>
  )
}
