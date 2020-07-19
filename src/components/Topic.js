import React from 'react'
import { useRouteMatch, useParams } from 'react-router-dom'

export default function Topic() {
  let match = useRouteMatch()
  console.log('Topic match: ', match)

  let { topicId } = useParams()
  return <h3>Requested topic ID: {topicId}</h3>
}
