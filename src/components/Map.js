import React, { useContext } from 'react'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import { GeoContext } from './Home'

import { makeStyles } from '@material-ui/core/styles'

// fixing https://github.com/PaulLeCam/react-leaflet/issues/453
import L from 'leaflet'
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

const useStyles = makeStyles(theme => ({
  map: {
    height: '100%',
    overflow: 'hidden',
  },
}))

const Map = () => {
  const classes = useStyles()
  const { map, setMap } = useContext(GeoContext)
  return (
    <MapContainer
      center={[32.12504, 34.83082]}
      zoom={17}
      scrollWheelZoom={false}
      className={classes.map}
      whenCreated={setMap}
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
