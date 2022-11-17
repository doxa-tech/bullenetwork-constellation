import React, { useState, useEffect } from "react"

import { IntroLeft, IntroRight } from "../../components/intro"
import BannerCMP from "../../components/banner"
import { useStaticQuery, graphql } from "gatsby"

import "./welcome.scss"

const Welcome = () => {
  const img = useStaticQuery(graphql`
    query {
      desktop: file(relativePath: { eq: "banner.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
    }
  `)

  const [youtube, setYoutube] = useState(0)
  const [notice, setNotice] = useState(1)

  useEffect(() => {
    setYoutube(
      `<div class="loadrr"><div><div></div><div></div><div></div><div></div></div></div>`
    )

    setNotice("")

    fetch(`${process.env.GATSBY_DIRECTUS_ENDPOINT}/items/eebulle_home_welcome/1`)
      .then(response => response.json())
      .then(resultData => {
        setYoutube(resultData.data.content)
      })
    fetch(`${process.env.GATSBY_DIRECTUS_ENDPOINT}/items/eebulle_home_welcome/2`)
      .then(response => response.json())
      .then(resultData => {
        if (resultData.data.status === "published") {
          setNotice(
            <div className="notice" dangerouslySetInnerHTML={{ __html: resultData.data.content }} />
          )
        }
      })
  }, [])

  return (
    <BannerCMP fluidImg={img.desktop.childImageSharp.fluid}>

      {notice}

      <div className="welcome">

        <div className="left">
          <div className="left-text">
            <h1>Bienvenue à l'EEBulle</h1>
            <p>Une église accessible et inter-générationelle. Célébration tous les dimanches à 10h<br />Accueil dès 9h30</p>
          </div>
          <IntroLeft>
            <div className="video" dangerouslySetInnerHTML={{ __html: youtube }} />
          </IntroLeft>
        </div>

        <div className="right">
          <IntroRight>
            <h2>Nous trouver</h2>

            <div className="map-container">
              <iframe title="Carte géographique" src='https://map.geo.admin.ch/embed.html?lang=fr&topic=ech&bgLayer=ch.swisstopo.swissimage&layers=ch.swisstopo.zeitreihen,ch.bfs.gebaeude_wohnungs_register,ch.bav.haltestellen-oev,ch.swisstopo.swisstlm3d-wanderwege,KML%7C%7Chttps:%2F%2Fpublic.geo.admin.ch%2Fuml5abeiSjCx8GYa_70nWQ&layers_opacity=1,1,1,0.8,1&layers_visibility=false,false,false,false,true&layers_timestamp=18641231,,,,&E=2571532.54&N=1163693.31&zoom=11' width='100%' height='100%' frameBorder='0'></iframe>
            </div>
          </IntroRight>
          <div className="subinfo">
            <p>
              Places de parc disponibles devant l'église, Route du Verdel 8 à Bulle.
              Célébrations adaptées pour les enfants avec Kids Bulle College.
            </p>
          </div>
        </div>
      </div>
      <div className="slogan">
        <p>pourquoi l'EEBulle?</p>
        <h2>"Parce que la Vie est éternelle"</h2>
      </div>
    </BannerCMP>
  )
}

export default Welcome
