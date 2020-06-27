import React, { useState, useEffect } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "./groups/swisstopo.loader.js"
import "./groups/groups.scss"
import { Helmet } from "react-helmet"
import BannerCMP from "../components/banner"
import { useStaticQuery, graphql } from "gatsby"

const Groups = () => {
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

  const [content, setContent] = useState(1)
  useEffect(() => {
    setContent(
      '<div class="loadrr"><div><div></div><div></div><div></div><div></div></div></div>'
    )
    fetch(`https://panda.bullenetwork.ch/directus/items/eebulle_gdms`)
      .then(response => response.json())
      .then(resultData => {
        const result = resultData.data.map((gdm) =>
          <div className="gdm">
            <span className="loc">À {gdm.location}</span><br />avec {gdm.leader}<br /><span className="contact-wrap">Contact: <div className="contact" dangerouslySetInnerHTML={{ __html: gdm.contact }} /></span>
          </div>
        );
        setContent(result)
      })
  }, [])

  return (
    <Layout layoutClass="groups">
      <Helmet>
        <script src={'/map.js'} />
      </Helmet>

      <SEO title="Groupe de maison" />

      <BannerCMP fluidImg={img.desktop.childImageSharp.fluid}>
        <h2>Le dimanche matin, c'est le match.<br />L'entrainement se fait la semaine en groupe de maison.</h2>
      </BannerCMP>

      <div className="intro">
        Pour grandir ensemble, rejoingnez un groupe de maison! Les groupes de maison
        sont l'occasion d'approfondir nos relations et la parole de Dieu. Un groupe
        de maison se réunis généralement une semaine sur deux.
      </div>

      <div className="gdms">
        {content}
      </div>

      <div className="map-wrapper">
        <div id="map" className="map">
        </div>
        <div id="popup" className="ol-popup">
          <a href="#" id="popup-closer" className="ol-popup-closer"></a>
          <div id="popup-content"></div>
        </div>
      </div>
    </Layout>
  )
}

export default Groups