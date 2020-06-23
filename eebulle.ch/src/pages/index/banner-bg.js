import React from "react"
import BackgroundImage from "gatsby-background-image"
import { StaticQuery, graphql } from "gatsby"

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query {
        desktop: file(relativePath: { eq: "banner.jpg" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
      }
    `}
    render={data => {
      // Set ImageData.
      const imageData = data.desktop.childImageSharp.fluid
      return (
        <BackgroundImage
          Tag="section"
          fluid={imageData}
          backgroundColor={`grey`}
          style={{
            width: "100%",
          }}
        >
          {children}
        </BackgroundImage>
      )
    }}
  />
)
