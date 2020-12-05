import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectMerchantById } from '../../redux/merchants'
import { GeoContext } from '../Home'

import { ListConfig } from './List'

import { Draggable } from 'react-beautiful-dnd'

import { makeStyles } from '@material-ui/core/styles'
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
        ? theme.palette.up
        : direction === 'down'
        ? theme.palette.down
        : '#ccc',
  },
}))

const getDraggableStyle = (isDragging, draggableStyle) => ({
  ...(isDragging && { background: 'lightgreen' }),
  ...draggableStyle,
})

const Entity = ({ id, index }) => {
  const { lang } = useSelector(store => store.app)
  const draggableId = String(id)
  const {
    selector,
    fields: { [lang]: lfields },
  } = useContext(ListConfig)

  const entity = useSelector(selectMerchantById(id))

  const [expanded, setExpanded] = useState(false)

  const { map } = useContext(GeoContext)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleLocateClick = ({ id, index }) => () => {
    console.log('id, index: ', id, index)
  }

  if (entity && entity.position) {
    const [from, to] = [
      entity.position.source?.index,
      entity.position.destination?.index,
    ]
    var direction = from < to ? 'down' : from > to ? 'up' : null
  }

  const classes = useStyles({ direction })

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
            <IconButton onClick={handleLocateClick({ id, index })}>
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
