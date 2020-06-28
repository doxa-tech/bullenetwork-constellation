import React, { useState, useEffect } from "react"

import { IntroLeft, IntroRight } from "../../components/intro"

import "./welcome.scss"

const Welcome = () => {
  const [intro, setIntro] = useState(0)
  const [youtube, setYoutube] = useState(1)
  const [subinfo, setSubinfo] = useState(2)

  useEffect(() => {
    setYoutube(
      `<div class="loadrr"><div><div></div><div></div><div></div><div></div></div></div>`
    )
    setIntro(
      `<div class="loadrr"><div><div></div><div></div><div></div><div></div></div></div>`
    )
    setSubinfo(
      `<div class="loadrr"><div><div></div><div></div><div></div><div></div></div></div>`
    )

    fetch(`https://panda.bullenetwork.ch/directus/items/eebulle_home_welcome/1`)
      .then(response => response.json())
      .then(resultData => {
        setIntro(resultData.data.content)
      })
    fetch(`https://panda.bullenetwork.ch/directus/items/eebulle_home_welcome/2`)
      .then(response => response.json())
      .then(resultData => {
        setYoutube(resultData.data.content)
      })
    fetch(`https://panda.bullenetwork.ch/directus/items/eebulle_home_welcome/3`)
      .then(response => response.json())
      .then(resultData => {
        setSubinfo(resultData.data.content)
      })
  }, [])

  return (
    <div className="intro">
      <div className="left">
        <div className="left-text" dangerouslySetInnerHTML={{ __html: intro }} />
        <IntroLeft>
          <div dangerouslySetInnerHTML={{ __html: youtube }} />
        </IntroLeft>
      </div>

      <div className="right">
        <IntroRight>
          <h2>Nous trouver</h2>

          <div className="map-container">
            <iframe src='https://map.geo.admin.ch/embed.html?lang=fr&topic=ech&bgLayer=ch.swisstopo.swissimage&layers=ch.swisstopo.zeitreihen,ch.bfs.gebaeude_wohnungs_register,ch.bav.haltestellen-oev,ch.swisstopo.swisstlm3d-wanderwege,KML%7C%7Chttps:%2F%2Fpublic.geo.admin.ch%2Fuml5abeiSjCx8GYa_70nWQ&layers_opacity=1,1,1,0.8,1&layers_visibility=false,false,false,false,true&layers_timestamp=18641231,,,,&E=2571532.54&N=1163693.31&zoom=11' width='100%' height='100%' frameBorder='0'></iframe>
          </div>
        </IntroRight>
        <div dangerouslySetInnerHTML={{ __html: subinfo }} />
      </div>
    </div>
  )
}

export default Welcome
