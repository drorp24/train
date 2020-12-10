import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { GeoContext } from '../Home'
import { marker } from '../Map'

import { ListConfig } from './List'

import { Draggable } from 'react-beautiful-dnd'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
// import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Avatar from '@material-ui/core/Avatar'
import CardHeader from '@material-ui/core/CardHeader'
import Collapse from '@material-ui/core/Collapse'
import RoomIcon from '@material-ui/icons/Room'
import DomainIcon from '@material-ui/icons/Domain'

const useStyles = makeStyles(theme => ({
  card: {
    margin: '1em',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '10px',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: ({ direction }) =>
      direction === 'up'
        ? theme.palette.shuffle.up
        : direction === 'down'
        ? theme.palette.shuffle.down
        : 'inherit',
    border: ({ direction }) =>
      direction ? 'none' : `1px solid ${theme.palette.text.secondary}`,
  },
}))

const Entity = ({ entity, index }) => {
  const {
    id,
    location: { coordinates },
    position,
  } = entity
  const { lang } = useSelector(store => store.app)
  const {
    fields: { [lang]: lfields },
  } = useContext(ListConfig)
  const draggableId = String(id)

  const [expanded, setExpanded] = useState(false)

  const { geo } = useContext(GeoContext)

  const handleLocateClick = () => {
    const { map } = geo
    const position = [coordinates[1], coordinates[0]]
    const [firstLine, secondLine] = [entity[lfields[1]], entity[lfields[2]]]

    map.flyTo(position)

    marker(position)
      .addTo(map)
      .bindPopup(`<p><strong>${firstLine}</strong></p><p>${secondLine}</p>`)
  }

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  let direction
  if (position) {
    const [from, to] = [position.source?.index, position.destination?.index]
    direction = from < to ? 'down' : from > to ? 'up' : null
  }

  const classes = useStyles({ direction })

  const theme = useTheme()
  const getDraggableStyle = (isDragging, draggableStyle) => {
    return {
      ...(isDragging && {
        background: theme.palette.grey[400],
        color: 'white',
      }),
      ...draggableStyle,
    }
  }

  return (
    <Draggable {...{ draggableId, index }}>
      {({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => (
        <Card
          key={id}
          className={classes.card}
          ref={innerRef}
          {...draggableProps}
          {...dragHandleProps}
          style={getDraggableStyle(isDragging, draggableProps.style)} // must be last
        >
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}>
                {direction === 'up' && <ArrowUpwardIcon />}
                {direction === 'down' && <ArrowDownwardIcon />}
              </Avatar>
            }
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            title={entity[lfields[1]]}
            subheader={entity[lfields[2]]}
          />
          <CardContent>
            {/* <Typography variant="body2" color="textSecondary" component="p">
              Some more content...
            </Typography> */}
          </CardContent>
          <CardActions disableSpacing>
            <IconButton onClick={handleLocateClick}>
              <RoomIcon />
            </IconButton>
            <IconButton>
              <DomainIcon />
            </IconButton>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Collapsed text here...</Typography>
            </CardContent>
          </Collapse>
        </Card>
      )}
    </Draggable>
  )
}

export default Entity
