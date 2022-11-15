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
      o2vie_about {
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

  const image = getImage(data.directus.o2vie_about.image.imageFile)

  return (
    <Layout>
      <Seo title="A propos" />

      <div id="main-wrapper">
        <div className="container">
          <div id="content">

            <GatsbyImage className={styles.image} image={image} alt="about" />
            <article dangerouslySetInnerHTML={{ __html: data.directus.o2vie_about.body }} />

          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage
