import React from "react"
import BackgroundImage from "gatsby-background-image"
import { useStaticQuery, graphql } from "gatsby"

export default ({ children }) => {
  const img = useStaticQuery(graphql`
    query {
      desktop: file(relativePath: { eq: "banner.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
    }
  `)

  return (
    <BackgroundImage
      Tag="section"
      fluid={img.desktop.childImageSharp.fluid}
      backgroundColor={`grey`}
      style={{ width: "100%",}}
    >
      {children}
    </BackgroundImage>
  )
}