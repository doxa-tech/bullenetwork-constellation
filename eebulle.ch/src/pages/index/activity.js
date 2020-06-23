import { useStaticQuery, graphql } from "gatsby"
import React from "react"
import Img from "gatsby-image"

const Activity = ({ path, title, description }) => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: allFile( filter: { internal: { mediaType: { regex: "activities/" } } } ) {
        edges {
          node {
            relativePath
            childImageSharp {
              fluid(maxWidth: 300) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)

  console.log(data)
  const match = useMemo(() => (
    data.allFile.edges.find(({ node }) => src === path)
  ), [data, src])

  return (
    <div className="activity">
      <Img fluid={data.placeholderImage.childImageSharp.fluid} />
    </div >
  )
}

export default Activity
