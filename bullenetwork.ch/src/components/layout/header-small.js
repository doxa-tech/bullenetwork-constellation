import React from "react"
import Img from "gatsby-image"
import { StaticQuery, graphql } from "gatsby"
import styles from "./header-small.module.scss"

export default ({ title }) => (
  <StaticQuery
    query={graphql`
      query MyQuery2 {
        file(relativePath: { eq: "index/bullenetwork.png" }) {
          childImageSharp {
            fluid(maxWidth: 200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => (
      <section id="header-section" className={styles.header}>
        <div className={styles.sectionContainer}>
          <div className={styles.subContainer}>
            <div className={styles.left}>
              <a href="/"><Img style={{ maxWidth: "200px" }} fluid={data.file.childImageSharp.fluid} /></a>
            </div>
            <div className={styles.right}>
              <p>
                {title}
              </p>
            </div>
          </div>
        </div>
      </section>
    )}
  />
)


