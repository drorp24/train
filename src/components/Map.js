import React from 'react'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  map: {
    height: '100%',
    overflow: 'scroll',
  },
}))

const Map = () => {
  const classes = useStyles()

  return (
    <MapContainer
      center={[32.12504, 34.83082]}
      zoom={17}
      scrollWheelZoom={false}
      className={classes.map}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[32.12504, 34.83082]}>
        <Popup>
          A pretty CSS3 popup.
          <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map
