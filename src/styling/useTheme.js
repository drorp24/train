import { useMemo } from 'react'
import { createMuiTheme } from '@material-ui/core/styles'
import { red, blue, green } from '@material-ui/core/colors'

// ToDo: proper placement of custom values e.g. appBarPortion, contrast
// ToDo: useCallback might be more suitable, since create<uiTheme is a function

const useTheme = (type, direction) =>
  useMemo(
    () =>
      createMuiTheme({
        layout: {
          appBarFr: 7,
          sideFr: 25,
          mainFr: 85,
        },
        direction,
        palette: {
          type,
          primary: { main: '#fff' },
          secondary: red,
          up: green[500],
          down: red[500],
        },
      }),
    [type, direction]
  )

export default useTheme
