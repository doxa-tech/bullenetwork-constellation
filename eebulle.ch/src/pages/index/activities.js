import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Activity from "./activity"

import "./activities.scss"

export const activityImage = graphql`
  fragment activityImage on File {
    childImageSharp {
      fluid(maxWidth: 300) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`

const Activities = () => {
  
  const images = useStaticQuery(graphql`
    query {
      first: file(relativePath: { eq: "activities/1.jpg" }) {
        ...activityImage
      }
      second: file(relativePath: { eq: "activities/2.jpg" }) {
        ...activityImage
      }
      third: file(relativePath: { eq: "activities/3.jpg" }) {
        ...activityImage
      }
      fourth: file(relativePath: { eq: "activities/4.jpg" }) {
        ...activityImage
      }
    }
  `)

  return (
    <div className="activities">
      <div className="container">
        <div className="left">
          <Activity fluidImg={images.first.childImageSharp.fluid} title="Enfants" description="description" />
          <Activity fluidImg={images.third.childImageSharp.fluid} title="Ados" description="description" />
        </div>
        <div className="right">
          <h2>Activités</h2>
          <Activity fluidImg={images.second.childImageSharp.fluid} title="Adultes" description="description" />
          <Activity fluidImg={images.fourth.childImageSharp.fluid} title="Seniors" description="description" />
        </div>
      </div>
    </div>
  )
}

export default Activities
