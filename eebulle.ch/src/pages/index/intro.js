import React from "react"

import "./intro.scss"

const Intro = () => (
  <div className="intro">
    <div className="left">
      <h1>Bienvenue à l'EEBulle</h1>
      <p>Célébration tous les dimanche à 10h<br />Accueil dès 9h30</p>
      <div className="video-wrapper">
        <h2>Vidéo du mois</h2>
        <div className="video-container">
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/5_9r0VKUiQc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
    </div>

    <div className="right">
      <div className="map-wrapper">
        <h2>Nous trouver</h2>

        <div className="map-container">
          <iframe src='https://map.geo.admin.ch/embed.html?lang=fr&topic=ech&bgLayer=ch.swisstopo.swissimage&layers=ch.swisstopo.zeitreihen,ch.bfs.gebaeude_wohnungs_register,ch.bav.haltestellen-oev,ch.swisstopo.swisstlm3d-wanderwege,KML%7C%7Chttps:%2F%2Fpublic.geo.admin.ch%2Fuml5abeiSjCx8GYa_70nWQ&layers_opacity=1,1,1,0.8,1&layers_visibility=false,false,false,false,true&layers_timestamp=18641231,,,,&E=2571532.54&N=1163693.31&zoom=11' width='100%' height='100%' frameborder='0'></iframe>
        </div>
      </div>
      <p>
        Parking disponible devant l'église, Route du Verdel 8 à Bulle. <br />
            Célébrations adaptées pour les enfants avec Kids Bulle College.
        </p>
    </div>
  </div>
)

export default Intro
