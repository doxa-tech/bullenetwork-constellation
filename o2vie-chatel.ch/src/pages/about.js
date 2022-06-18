import { graphql, useStaticQuery } from "gatsby"
import * as React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as styles from "./about.module.css"

import Layout from "../components/layout"
import Seo from "../components/seo"

const AboutPage = () => {
  const data = useStaticQuery(graphql`
  query {
    directus {
      O2vie_About {
        id
        body
        image {
          id
          imageFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  }
  `)

  const image = getImage(data.directus.O2vie_About.image.imageFile)

  return (
    <Layout>
      <Seo title="A propos" />

      <div id="main-wrapper">
        <div className="container">
          <div id="content">

            <GatsbyImage className={styles.image} image={image} alt="about" />
            <article dangerouslySetInnerHTML={{ __html: data.directus.O2vie_About.body }} />

          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage
