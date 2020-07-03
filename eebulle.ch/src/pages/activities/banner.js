import React from "react"
import BannerCMP from "../../components/banner"
import { useStaticQuery, graphql } from "gatsby"

import "./banner.scss"

const Banner = () => {
  const img = useStaticQuery(graphql`
    query {
      desktop: file(relativePath: { eq: "activities/banner.jpg" }) {
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
      <div className="banner-activities">
        <h2>L'église au delà des célébrations</h2>
      </div>
    </BannerCMP>
  )
}

export default Banner
