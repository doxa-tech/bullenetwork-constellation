import React from "react"
import Img from "gatsby-image"
import { StaticQuery, graphql } from "gatsby"
import styles from "./intro.module.scss"

export default () => (
  <StaticQuery
    query={graphql`
      query Fioriture {
        file(relativePath: { eq: "index/fioriture.png" }) {
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => (
      <section className={styles.intro}>
        <div className={styles.container}>
          <h1>Le Bulle Network est le réseau d'églises né de l'église évangélique de Bulle</h1>
          <Img style={{maxWidth: "300px", margin: "0 auto"}} fluid={data.file.childImageSharp.fluid} />
        </div>
      </section>
    )}
  />
)
