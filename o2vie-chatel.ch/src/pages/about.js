import { graphql, useStaticQuery } from "gatsby"
import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const AboutPage = () => {
  const data = useStaticQuery(graphql`
  query {
    directus {
      O2vie_About {
        id
        body
      }
    }
  }
  `)

  return (
    <Layout>
      <Seo title="A propos" />

      <div id="main-wrapper">
        <div className="container">
          <div id="content">

            <article dangerouslySetInnerHTML={{ __html: data.directus.O2vie_About.body }} />

          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage
