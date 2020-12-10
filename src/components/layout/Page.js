import React, { useEffect, useRef, useState } from 'react'

import AppBar from './AppBar'
import debounce from '../../utility/debounce'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => {
  const {
    layout: { appBarFr, sideFr, mainFr },
  } = theme
  return {
    page: {
      height: '100vh',
      display: 'grid',
      gridTemplateColumns: `${sideFr}fr ${mainFr}fr`,
      gridTemplateRows: `${appBarFr}fr ${100 - appBarFr}fr`,
      gridTemplateAreas: `
      'appBar main'
      'side main'
    `,
    },
    appBar: {
      gridArea: 'appBar',
      border: '1px solid #ddd',
    },
    side: {
      gridArea: 'side',
      overflow: 'scroll',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      '-ms-overflow-style': 'none',
      backgroundColor: theme.palette.grey[300],
      // zIndex: 401, // hides the list
    },
    main: {
      gridArea: 'main',
    },
    children: {
      // gridArea: 'children',
    },
  }
})

// Page handles loading, error & empty so its callers won't have to
const Page = ({ appBar, side, main, children, ...rest }) => {
  const classes = useStyles()
  const [appBarElevation, setAppBarElevation] = useState(0)

  // for some reason or another, setting the zIndex in the class hides the list
  const ref = useRef()
  window.ref = ref
  useEffect(() => {
    ref.current.style.zIndex = 401
  }, [])

  const onScroll = debounce(() => {
    setAppBarElevation(ref.current.scrollTop ? 3 : 0)
  })

  return (
    <Paper square className={classes.page} {...rest}>
      {appBar && (
        <div className={classes.appBar}>
          <AppBar elevation={appBarElevation} />
        </div>
      )}
      <Paper
        square
        elevation={5}
        className={classes.side}
        ref={ref}
        onScroll={onScroll}
      >
        {side}
      </Paper>
      <div className={classes.main}>{main}</div>
      <div className={classes.side}>{children}</div>
    </Paper>
  )
}
export default Page
