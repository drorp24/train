import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reorder } from '../../redux/merchants'
import { positionFilters } from '../../redux/app'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { makeStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/core/styles'
import useTheme from '../../styling/useTheme'
import Paper from '@material-ui/core/Paper'
import AppBar from '@material-ui/core/AppBar'

import MenuBar from './MenuBar'
import FiltersBar from './FiltersBar'
import FloatingBar from './FloatingBar'

import debounce from '../../utility/debounce'

const useStyles = makeStyles(theme => {
  const {
    layout: { menuBarHeight, filtersBarHeight, sideBarWidth },
  } = theme

  const toolbarsHeight = menuBarHeight + filtersBarHeight
  const sideBarHeight = 100 - toolbarsHeight
  const mainWidth = 100 - sideBarWidth
  return {
    page: {
      height: '100vh',
      display: 'grid',
      gridTemplateColumns: `${sideBarWidth}fr ${mainWidth}fr`,
      gridTemplateRows: ({ filtersBarPosition }) =>
        `${menuBarHeight}fr ${
          filtersBarPosition === 'filtersBar' ? filtersBarHeight : 0
        }fr ${sideBarHeight}fr`,
      gridTemplateAreas: `
      'menuBar main'
      'filtersBar main'
      'side main'
    `,
    },
    menuBar: {
      gridArea: 'menuBar',
      position: 'relative',
    },
    filtersAppBar: {
      gridArea: 'filtersBar',
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
  const filtersBarPosition = useSelector(store => store.app.filters)
  const dispatch = useDispatch()

  const [menuBarElevation, setMenuBarElevation] = useState(0)
  const [filtersBarElevation, setFiltersBarElevation] = useState(0)
  const [isFiltersDragging, setIsFiltersDragging] = useState(false)

  const classes = useStyles({ filtersBarPosition, isFiltersDragging })

  const theme = useTheme('light')

  // for some reason or another, setting the zIndex upfront hides the list
  // so I'm waiting for render to happen before imperatively setting it
  const ref = useRef()
  useEffect(() => {
    ref.current.style.zIndex = 401
  }, [])

  const onScroll = debounce(() => {
    if (filtersBarPosition === 'filtersBar') {
      setFiltersBarElevation(ref.current.scrollTop ? 3 : 0)
    } else {
      setMenuBarElevation(ref.current.scrollTop ? 3 : 0)
    }
  })

  const onDragEnd = ({ draggableId, source, destination }) => {
    console.log('source: ', source)
    console.log('destination: ', destination)
    console.log('draggableId: ', draggableId)
    if (
      !destination ||
      (source.droppableId === 'list' && destination.droppableId !== 'list') ||
      (source.droppableId === 'list' && destination.index === source.index)
    )
      return

    if (source.droppableId === 'list' && destination.droppableId === 'list') {
      dispatch(reorder({ draggableId, source, destination }))
    }

    if (source.droppableId === 'filtersBar') {
      if (destination.droppableId === 'list') return
      dispatch(positionFilters(destination.droppableId))
    }

    if (source.droppableId === 'floatingBar') {
      dispatch(positionFilters('filtersBar'))
    }
  }

  return (
    <Paper square className={classes.page} {...rest}>
      <DragDropContext onDragEnd={onDragEnd}>
        {menuBar && (
          <ThemeProvider theme={theme}>
            <AppBar elevation={menuBarElevation} className={classes.menuBar}>
              <MenuBar />
            </AppBar>
          </ThemeProvider>
        )}
        {filtersBar && (
          <Droppable
            droppableId="filtersBar"
            style={{ border: '5px solid green' }}
          >
            {(
              { innerRef, droppableProps, placeholder },
              { isDraggingOver }
            ) => (
              <div ref={innerRef} {...droppableProps}>
                <Draggable draggableId="draggableFilter" index={0}>
                  {(
                    { innerRef, draggableProps, dragHandleProps },
                    { isDragging }
                  ) => {
                    setIsFiltersDragging(isDragging)
                    return (
                      <div
                        ref={innerRef}
                        {...draggableProps}
                        {...dragHandleProps}
                      >
                        <AppBar
                          elevation={
                            isFiltersDragging ? 5 : filtersBarElevation
                          }
                          className={classes.filtersAppBar}
                        >
                          <FiltersBar
                            style={{
                              display:
                                filtersBarPosition === 'filtersBar'
                                  ? 'flex'
                                  : 'none',
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
