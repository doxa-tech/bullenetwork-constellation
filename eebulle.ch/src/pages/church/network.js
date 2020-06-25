import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import "./network.scss"

export const logoImage = graphql`
  fragment logoImage on File {
    childImageSharp {
      fluid(maxWidth: 200) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`

const Network = () => {
  const images = useStaticQuery(graphql`
    query {
      bullenetwork: file(relativePath: { eq: "logo/bullenetwork_bw.png" }) {
        ...logoImage
      }
      eear: file(relativePath: { eq: "logo/eear_bw.png" }) {
        ...logoImage
      }
      res: file(relativePath: { eq: "logo/res_bw.png" }) {
        ...logoImage
      }
    }
  `)

  return (
    <div className="network">
      <div className="container">
        <h2>Notre appartenance</h2>
        <div className="networks">
          <p>L'église évangélique de Bulle est membre fondatrice du <a href="https://bullenetwork.ch" target="_blank">Bulle Network</a></p>
          <Img fluid={images.bullenetwork.childImageSharp.fluid} style={{ width: "230px" }} />
          <p>Le Bulle Network est un hub des <a href="http://www.eear.ch" target="_blank">églises évangélique apostolique</a></p>
          <Img fluid={images.eear.childImageSharp.fluid} style={{ width: "255px" }} />
          <p>L'EEBulle appartient également au <a href="https://evangelique.ch" target="_blank">Réseau évangélique</a></p>
          <Img fluid={images.res.childImageSharp.fluid} style={{ width: "200px" }} />
        </div>
      </div>
    </div>
  )
}

export default Network