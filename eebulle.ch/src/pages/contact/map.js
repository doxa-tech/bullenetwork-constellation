import React from "react"

import "./map.scss"

const Map = () => (
  <div className="map">
    <iframe className="frame" src='https://map.geo.admin.ch/embed.html?lang=fr&topic=ech&bgLayer=ch.swisstopo.swissimage&layers=ch.swisstopo.zeitreihen,ch.bfs.gebaeude_wohnungs_register,ch.bav.haltestellen-oev,ch.swisstopo.swisstlm3d-wanderwege,KML%7C%7Chttps:%2F%2Fpublic.geo.admin.ch%2Fuml5abeiSjCx8GYa_70nWQ&layers_opacity=1,1,1,0.8,1&layers_visibility=false,false,false,false,true&layers_timestamp=18641231,,,,&E=2571532.54&N=1163693.31&zoom=11' width='100%' height='100%' frameBorder='0'></iframe>
  </div>
)

export default Map