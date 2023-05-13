import React, { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { icon } from "leaflet"
import CSS from "./Map.module.scss"

import "./map.scss"
import "./leaflet.scss"

const Markers = () => {
  const [markers, setMarkers] = useState(null)

  const markerIcon = icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "leaflet/marker-icon-2x.png",
    iconRetinaUrl: "leaflet/marker-icon-2x.png",
    shadowUrl: "leaflet/marker-shadow.png",
  });

  useEffect(() => {
    fetch(`${import.meta.env.PUBLIC_DIRECTUS_ENDPOINT}/items/o2vie_locations`)
      .then(response => response.json())
      .then(json => {
        var locations = json.data

        setMarkers(locations.map(g =>
          <Marker icon={markerIcon} key={g.id} position={[g.location.coordinates[1], g.location.coordinates[0]]}>
            <Popup>{g.description}</Popup>
          </Marker>
        ))
      })
  }, [])

  return markers === null ? null : markers
}

const Map = () => {

  const position = [46.530978, 6.89888331985121]

  if (typeof window !== 'undefined') {
    return (
      <div className="map-wrapper">
        <MapContainer className="map" center={position} zoom={15} scrollWheelZoom={false}>
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