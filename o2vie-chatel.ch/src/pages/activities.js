import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

import Seo from "../components/seo"
import Activity from "../components/activity"

import "./activities.css"

const ActivitiesPage = ({ data }) => {
  return (
    <Layout>
      <Seo title="Activités" />

      <div id="main-wrapper" className="activities">
        <div className="container">
          <div id="content">
            <h2>Nos activités</h2>
            <h4>Découvre nos activités à Châtel et dans la région.</h4>
          </div>
        </div>
      </div>

      <div id="features-wrapper">
        <div className="container">
          <div className="row">

            {data.directus.o2vie_activities.map((a) => (
              <Activity key={a.id.toString()} activity={a} />
            ))
            }

          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ActivitiesPage

export const query = graphql`
  query {
    directus {
      o2vie_activities {
        id
        body
        subtitle
        title
        image {
          id
          imageFile {
            childImageSharp {
              gatsbyImageData(aspectRatio: 1.7, layout: FULL_WIDTH)
            }
          }
        }
      }
    }
  }
`