import React, { useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

import "./map.scss"

const Markers = () => {
  const [markers, setMarkers] = useState(null)

  fetch(`https://panda.bullenetwork.ch/directus/items/eebulle_gdms`)
    .then(response => response.json())
    .then(json => {

      var groups = json.data

      setMarkers(groups.map(g =>
        <Marker key={g.id} position={[g.location_map.lat, g.location_map.lng]}>
          <Popup>À {g.location} avec {g.leader}</Popup>
        </Marker>
      ))

    }
  )

  return markers === null ? null : markers
}

const Map = () => {

  const position = [46.702730, 7.083670]
  
  if (typeof window !== 'undefined') {
    return (
      <div className="map-wrapper">
        <MapContainer className="map" center={position} zoom={11} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Markers />
        </MapContainer>
      </div>
    )
  }
  return null
}

export default Map