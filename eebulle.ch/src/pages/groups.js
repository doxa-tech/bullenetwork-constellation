import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import BannerCMP from "../components/banner"

import "./groups/groups.scss"
import Map from "./groups/map.js"


const Groups = () => {
  const img = useStaticQuery(graphql`
    query {
      desktop: file(relativePath: { eq: "groups/banner.jpg" }) {
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
      <div className="loadrr"><div><div></div><div></div><div></div><div></div></div></div>
    )
    fetch(`https://panda.bullenetwork.ch/directus/items/eebulle_gdms`)
      .then(response => response.json())
      .then(resultData => {
        const result = resultData.data.map((gdm) =>
          <div className="gdm" key={gdm.id}>
            <span className="loc">À {gdm.location}</span><br />avec {gdm.leader}<br /><span className="contact-wrap">Contact: <div className="contact" dangerouslySetInnerHTML={{ __html: gdm.contact }} /></span>
          </div>
        );
        setContent(result)
      })
  }, [])

  return (
    <Layout layoutClass="groups">
      <SEO title="Groupe de maison" />

      <BannerCMP fluidImg={img.desktop.childImageSharp.fluid}>
        <h2>Le dimanche matin, c'est le match.<br />L'entrainement se fait la semaine en groupe de maison.</h2>
      </BannerCMP>

      <div className="intro">
        Pour grandir ensemble, rejoingnez un groupe de maison! Les groupes de maison
        sont l'occasion d'approfondir nos relations et la parole de Dieu. Un groupe
        de maison se réunit généralement une semaine sur deux.
      </div>

      <div className="gdms">
        {content}
      </div>

      <Map />

    </Layout>
  )
}

export default Groups