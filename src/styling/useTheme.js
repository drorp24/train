import { useMemo } from 'react'
import { createMuiTheme } from '@material-ui/core/styles'

// ToDo: proper placement of custom values e.g. appBarPortion, contrast

const useTheme = (type, direction) =>
  useMemo(
    () =>
      createMuiTheme({
        appBarPortion: 10,
        direction,
        palette: {
          type,
          contrast: type === 'light' ? 'black' : 'white',
        },
      }),
    [type, direction]
  )

export default useTheme
