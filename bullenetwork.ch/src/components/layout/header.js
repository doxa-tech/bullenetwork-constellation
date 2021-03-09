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
      <section id="header-section" className={styles.header}>
        <HeaderBG>
          <div>
            <div className={styles.sectionContainer}>
              <div className={styles.subContainer}>
                <div className={styles.left}>
                  <a href="/"><Img style={{ maxWidth: "350px" }} fluid={data.file.childImageSharp.fluid} /></a>
                </div>
                <div className={styles.right}>
                  <p>
                    <span>“</span>
                    <span>Parce que nous aimons notre prochain</span>
                    <span>”</span>
                  </p>
                </div>
              </div>
            </div>
            {/* <div className={styles.menuContainer}>
              <Link to="/" activeClassName={styles.activeLink}>Home</Link>
              <Link to="/academy" activeClassName={styles.activeLink}>Academy</Link>
              <Link to="/contact" activeClassName={styles.activeLink}>Contact</Link>
            </div> */}
          </div>
        </HeaderBG>
      </section>
    )}
  />
)


