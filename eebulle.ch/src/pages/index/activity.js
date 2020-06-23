import { useStaticQuery, graphql } from "gatsby"
import React from "react"
import Img from "gatsby-image"

const Activity = ({ path, title, description }) => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "activities/1.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <div className="activity">
      <Img fluid={data.placeholderImage.childImageSharp.fluid} />
    </div >
  )
}

export default Activity
