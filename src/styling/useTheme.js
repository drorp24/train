import { useMemo } from 'react'
import { createMuiTheme } from '@material-ui/core/styles'
import { red, blue, green } from '@material-ui/core/colors'

// ToDo: proper placement of custom values e.g. appBarPortion, contrast
// ToDo: useCallback might be more suitable, since create<uiTheme is a function

const useTheme = (type, direction) =>
  useMemo(
    () =>
      createMuiTheme({
        appBarPortion: 6,
        direction,
        palette: {
          type,
          primary: blue,
          secondary: red,
          up: green[500],
          down: red[500],
        },
      }),
    [type, direction]
  )

export default useTheme
