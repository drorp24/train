import React from 'react'

import Paper from '@material-ui/core/Paper'

const Page = ({ children }) => (
  <Paper square style={{ height: '100vh' }}>
    {children}
  </Paper>
)

export default Page
