import { useMemo } from 'react'
import { createMuiTheme } from '@material-ui/core/styles'
import { red, grey, green } from '@material-ui/core/colors'
import lightBlue from '@material-ui/core/colors/lightBlue'

const useTheme = (type, direction) =>
  useMemo(
    () =>
      createMuiTheme({
        layout: {
          menuBarHeight: 7,
          toolBarHeight: 7,
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
          droppableWhileDraggingOver: {
            border: `7px dashed ${grey[500]}`,
          },
          draggableWhileDragging: {
            background: grey[400],
            color: 'white',
            border: '5px dashed blue',
          },
          droppableWhileDragging: {
            border: `7px dashed ${grey[500]}`,
          },
        },
      }),
    [type, direction]
  )

export default useTheme
