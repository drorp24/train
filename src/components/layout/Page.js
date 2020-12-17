import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { DragDropContext } from 'react-beautiful-dnd'

import { makeStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/core/styles'
import useTheme from '../../styling/useTheme'
import Paper from '@material-ui/core/Paper'
import AppBar from '@material-ui/core/AppBar'

import MenuBar from './MenuBar'
import ToolBar from './ToolBar'
import FloatingBar from './FloatingBar'

import debounce from '../../utility/debounce'
import { onDragEnd } from '../../utility/dragAndDrop'

const useStyles = makeStyles(theme => {
  const {
    layout: { menuBarHeight, toolBarHeight, sideBarWidth },
  } = theme

  const barsHeight = menuBarHeight + toolBarHeight
  const mainWidth = 100 - sideBarWidth

  return {
    page: {
      height: '100vh',
      display: 'grid',
      gridTemplateColumns: `[side] ${sideBarWidth}fr [map] ${mainWidth}fr`,
      gridTemplateRows: '1fr',
    },
    sideBar: {
      // display: 'none',
      // gridArea: 'side',
      overflow: 'scroll',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      '-ms-overflow-style': 'none',
      zIndex: 401,
      backgroundColor: theme.palette.background.sideBar,
    },
    appBar: {
      width: `${sideBarWidth}vw`,
      left: 0,
      backgroundColor: theme.palette.background.sideBar,
    },
    menuBar: {
      // gridArea: 'menuBar',
      position: 'relative',
    },
    toolBar: {
      // gridArea: 'toolBar',
      zIndex: '402',
      position: 'relative',
      borderRadius: theme.layout.borderRadius,
    },
    list: {
      // gridArea: 'list',
      marginTop: ({ draggables }) =>
        draggables.length ? `${barsHeight}vh` : `${menuBarHeight}vh`,
      padding: theme.layout.sideBarPadding,
      transition: 'margin-top 0.2s',
    },
    map: {
      // gridArea: 'map',
      height: '100%',
      width: '100%',
    },
    floatingBar: {
      position: 'fixed',
      zIndex: '1101',
      left: `${sideBarWidth / 2 + mainWidth / 2}vw`,
      // ToDo: record isDragging in redux (debounced) and have the corresponding droppables react with theme....
      // border: ({ isFiltersDragging }) =>
      //   isFiltersDragging ? '3px dashed' : 'inherit',
      borderRadius: theme.layout.borderRadius,
    },
    children: {
      // gridArea: 'children',
    },
  }
})

const Page = ({ menuBar, toolBar, list, map, children, ...rest }) => {
  const dispatch = useDispatch()
  const [toolbarElevation, setToolbarElevation] = useState(0)
  const ref = useRef()
  const theme = useTheme('light')

  const draggables = useSelector(store => store.app.toolBar)
  const classes = useStyles({ draggables })

  const onScroll = debounce(() => {
    setToolbarElevation(ref.current.scrollTop ? 3 : 0)
  })

  return (
    <Paper square className={classes.page} {...rest}>
      <DragDropContext onDragEnd={onDragEnd(dispatch)}>
        <Paper
          square
          elevation={5}
          className={classes.sideBar}
          ref={ref}
          onScroll={onScroll}
        >
          {(menuBar || toolBar) && (
            <AppBar elevation={toolbarElevation} className={classes.appBar}>
              <ThemeProvider theme={theme}>
                {menuBar && (
                  <div className={classes.menuBar}>
                    <MenuBar />
                  </div>
                )}
              </ThemeProvider>
              {toolBar && (
                <div className={classes.toolBar}>
                  <ToolBar {...{ draggables }} />
                </div>
              )}
            </AppBar>
          )}
          <div className={classes.list}>{list}</div>
        </Paper>
        <div className={classes.map}>{map}</div>
        <div className={classes.floatingBar}>
          <FloatingBar />
        </div>
        <div className={classes.children}>{children}</div>
      </DragDropContext>
    </Paper>
  )
}
export default Page
