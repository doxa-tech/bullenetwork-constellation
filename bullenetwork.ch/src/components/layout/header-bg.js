import React from "react"
import BackgroundImage from "gatsby-background-image"
import { StaticQuery, graphql } from "gatsby"

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query {
        desktop: file(relativePath: { eq: "index/header-bg.jpg" }) {
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
          backgroundColor={`#040e18`}
          style={{
            color: "red",
            width: "100%",
          }}
        >
          {children}
        </BackgroundImage>
      )
    }}
  />
)
