import { useMemo } from 'react'
import { createMuiTheme } from '@material-ui/core/styles'
import { red, grey, green } from '@material-ui/core/colors'
import lightBlue from '@material-ui/core/colors/lightBlue'

// ToDo: proper placement of custom values e.g. appBarPortion, contrast
// ToDo: useCallback might be more suitable, since create<uiTheme is a function

const useTheme = (type, direction) =>
  useMemo(
    () =>
      createMuiTheme({
        layout: {
          menuBarHeight: 10,
          toolBarHeight: 10,
          sideBarWidth: 30,
          borderRadius: '10px',
          sideBarPadding: '1rem',
          listItemMargin: '0.5rem',
        },
        direction,
        palette: {
          type,
          primary: lightBlue,
          secondary: green,
          shuffle: {
            up: green[500],
            down: red[500],
          },
          background: {
            sideBar: grey[300],
          },
        },
        interaction: {
          droppableHint: {
            border: `5px solid ${lightBlue[500]}`,
          },
          draggableWhileDragging: {
            background: grey[400],
            color: 'white',
          },
        },
      }),
    [type, direction]
  )

export default useTheme
