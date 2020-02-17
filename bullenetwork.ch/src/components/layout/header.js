import React from "react"
import Img from "gatsby-image"
import { StaticQuery, graphql } from "gatsby"
import styles from "./header.module.scss"
import HeaderBG from './header-bg'

export default () => (
  <StaticQuery
    query={graphql`
      query MyQuery {
        file(relativePath: { eq: "index/bullenetwork.png" }) {
          childImageSharp {
            fluid(maxWidth: 350) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => (
      <section className={styles.header}>
        <HeaderBG>
          <div>
            <div className={styles.sectionContainer}>
              <div className={styles.subContainer}>
                <div className={styles.left}>
                  <Img style={{maxWidth: "350px"}} fluid={data.file.childImageSharp.fluid} />
                </div>
                <div className={styles.right}>
                  <p>
                    <span>“</span>
                    <span>Parce que ZE force est en Christ</span>
                    <span>”</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </HeaderBG>
      </section>
    )}
  />
)


