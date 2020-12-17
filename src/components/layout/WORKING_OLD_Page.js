import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { makeStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/core/styles'
import useTheme from '../../styling/useTheme'
import Paper from '@material-ui/core/Paper'
import AppBar from '@material-ui/core/AppBar'

import MenuBar from './MenuBar'
import Filters from './Filters'
import FloatingBar from './FloatingBar'

import debounce from '../../utility/debounce'
import { onDragEnd } from '../../utility/dragAndDrop'

const useStyles = makeStyles(theme => {
  const {
    layout: { menuBarHeight, toolBarHeight, sideBarWidth },
  } = theme

  const toolbarsHeight = menuBarHeight + toolBarHeight
  const sideBarHeight = 100 - toolbarsHeight
  const mainWidth = 100 - sideBarWidth
  return {
    page: {
      height: '100vh',
      display: 'grid',
      gridTemplateColumns: `${sideBarWidth}fr ${mainWidth}fr`,
      gridTemplateRows: ({ filtersPosition }) =>
        `${menuBarHeight}fr ${
          filtersPosition === 'toolBar' ? toolBarHeight : 10
        }fr ${sideBarHeight}fr`,
      gridTemplateAreas: `
      'menuBar main'
      'toolBar main'
      'side main'
    `,
    },
    menuBar: {
      gridArea: 'menuBar',
      position: 'relative',
    },
    toolBar: {
      gridArea: 'toolBar',
      zIndex: '402',
      position: 'relative',
      borderRadius: theme.layout.borderRadius,
    },

    sideBar: {
      gridArea: 'side',
      overflow: 'scroll',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      '-ms-overflow-style': 'none',
      backgroundColor: theme.palette.background.sideBar,
      // zIndex: 401, // hides the list
      marginTop: `-${toolbarsHeight}vh`,
      paddingTop: `${toolbarsHeight}vh`,
      paddingLeft: theme.layout.sideBarPadding,
      paddingRight: theme.layout.sideBarPadding,
    },
    main: {
      gridArea: 'main',
    },
    floatingBar: {
      position: 'fixed',
      zIndex: '1101',
      left: `${sideBarWidth / 2 + mainWidth / 2}vw`,
      border: ({ isFiltersDragging }) =>
        isFiltersDragging ? '3px dashed' : 'inherit',
      borderRadius: theme.layout.borderRadius,
    },
    children: {
      // gridArea: 'children',
    },
  }
})

const Page = ({ menuBar, filtersBar, sideBar, main, children, ...rest }) => {
  const filtersPosition = useSelector(store => store.app.filters)
  const dispatch = useDispatch()

  const [menuBarElevation, setMenuBarElevation] = useState(0)
  const [toolBarElevation, setToolBarElevation] = useState(0)
  const [isFiltersDragging, setIsFiltersDragging] = useState(false)

  const classes = useStyles({ filtersPosition, isFiltersDragging })

  const theme = useTheme('light')

  // for some reason or another, setting the zIndex upfront hides the list
  // so I'm waiting for render to happen before imperatively setting it
  const ref = useRef()
  useEffect(() => {
    ref.current.style.zIndex = 401
  }, [])

  const onScroll = debounce(() => {
    if (filtersPosition === 'toolBar') {
      setToolBarElevation(ref.current.scrollTop ? 3 : 0)
    } else {
      setMenuBarElevation(ref.current.scrollTop ? 3 : 0)
    }
  })

  return (
    <Paper square className={classes.page} {...rest}>
      <DragDropContext onDragEnd={onDragEnd(dispatch)}>
        {menuBar && (
          <ThemeProvider theme={theme}>
            <AppBar elevation={menuBarElevation} className={classes.menuBar}>
              <MenuBar />
            </AppBar>
          </ThemeProvider>
        )}
        {filtersBar && (
          <Droppable droppableId="toolBar">
            {(
              { innerRef, droppableProps, placeholder },
              { isDraggingOver }
            ) => (
              <div ref={innerRef} {...droppableProps}>
                <Draggable draggableId="filters" index={0}>
                  {(
                    { innerRef, draggableProps, dragHandleProps },
                    { isDragging }
                  ) => {
                    // setIsFiltersDragging(isDragging)
                    return (
                      <div
                        ref={innerRef}
                        {...draggableProps}
                        {...dragHandleProps}
                      >
                        <AppBar
                          elevation={isFiltersDragging ? 5 : toolBarElevation}
                          className={classes.filtersAppBar}
                          position="relative"
                        >
                          <Filters
                            style={{
                              display:
                                filtersPosition === 'toolBar' ? 'flex' : 'flex',
                            }}
                          />
                        </AppBar>
                      </div>
                    )
                  }}
                </Draggable>
                {placeholder}
              </div>
            )}
          </Droppable>
        )}
        <Paper
          square
          elevation={5}
          className={classes.sideBar}
          ref={ref}
          onScroll={onScroll}
        >
          {sideBar}
        </Paper>
        <div className={classes.main}>{main}</div>
        <div className={classes.floatingBar}>
          <FloatingBar />
        </div>
        <div className={classes.children}>{children}</div>
      </DragDropContext>
    </Paper>
  )
}
export default Page
