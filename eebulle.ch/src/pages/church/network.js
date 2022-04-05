import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import "./network.scss"

export const logoImage = graphql`
  fragment logoImage on File {
    childImageSharp {
      fixed(height: 70) {
        ...GatsbyImageSharpFixed
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
      mp: file(relativePath: { eq: "logo/logoMP.png" }) {
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
          <p>L'église évangélique de Bulle est membre fondatrice du <a href="https://bullenetwork.ch" target="_blank" rel="noreferrer">Bulle Network</a></p>
          <Img fixed={images.bullenetwork.childImageSharp.fixed} />
          <p>Le Bulle Network est un hub du <a href="http://www.mouvementplus.ch/" target="_blank" rel="noreferrer">Mouvement Plus</a></p>
          <Img fixed={images.mp.childImageSharp.fixed} />
          <p>L'EEBulle appartient également au <a href="https://evangelique.ch" target="_blank" rel="noreferrer">Réseau évangélique</a></p>
          <Img fixed={images.res.childImageSharp.fixed} />
        </div>
      </div>
    </div>
  )
}

export default Network