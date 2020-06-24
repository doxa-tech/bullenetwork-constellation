import React from "react"
import BannerCMP from "../../components/banner"
import { useStaticQuery, graphql } from "gatsby"

import "./banner.scss"

const Banner = () => {
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

  return (
    <BannerCMP fluidImg={img.desktop.childImageSharp.fluid}>
      <div className="banner-index">
        <p>pourquoi l'EEBulle?</p>
        <h2>"Parce que la Vie est éternelle"</h2>
      </div>
    </BannerCMP>
  )
}

export default Banner
