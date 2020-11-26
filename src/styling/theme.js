import { createMuiTheme } from '@material-ui/core/styles'

const theme = (type, direction) =>
  createMuiTheme({
    direction,
    palette: {
      type,
      contrast: type === 'light' ? 'black' : 'white',
    },
  })

export default theme
