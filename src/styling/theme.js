import { createMuiTheme } from '@material-ui/core/styles'

const theme = type =>
  createMuiTheme({
    palette: {
      type,
      contrast: type === 'light' ? 'black' : 'white',
    },
  })

export default theme
