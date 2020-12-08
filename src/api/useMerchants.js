import { useQuery, gql } from '@apollo/client'
import client from '../apollo/client'

/*
const LONG_QUERY = gql`
  query NearbyMerchants(
    $product: Product!
    $amount: Float!
    $service: Service
    $area: Area
    $pagination: Pagination
  ) {
    merchants(
      product: $product
      amount: $amount
      service: $service
      area: $area
      pagination: $pagination
    ) {
      cursor
      hasMore
      records {
        id
        name
        address
        name_he
        delivery
        phone
        quote(product: $product, amount: $amount) {
          base
          quote
          amount
          price
          created
        }
        location {
          coordinates
        }
      }
    }
  }
`
*/

const SHORT_QUERY = gql`
  query NearbyMerchants(
    $product: Product!
    $amount: Float!
    $service: Service
    $area: Area
    $pagination: Pagination
  ) {
    merchants(
      product: $product
      amount: $amount
      service: $service
      area: $area
      pagination: $pagination
    ) {
      cursor
      hasMore
      records {
        id
        name
        name_he
        address
        address_he
        location {
          coordinates
        }
      }
    }
  }
`
const variables = {
  amount: 1,
  area: { lat: 32.0853, lng: 34.781769, distance: 50 },
  pagination: {
    sortKey: '_id',
    sortOrder: 'ascending',
    after: '',
    count: 8,
  },
  product: { base: 'BCH', quote: 'USD' },
  service: { delivery: false },
}

const query = SHORT_QUERY

// promise returning - for redux thunks and imperative calls
export const getMerchants = () => client.query({ query, variables })

// hook returning - for react components
export const useMerchants = () => useQuery(query, { variables })
