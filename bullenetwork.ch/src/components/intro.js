import React from "react"
import { StaticQuery, graphql } from "gatsby"
import * as styles from "./intro.module.scss"

export default ({ children }) => (
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
          <h1>{children}</h1>
          {/* <Img style={{ width: "300px", margin: "0 auto" }} fluid={data.file.childImageSharp.fluid} /> */}
        </div>
      </section>
    )}
  />
)
