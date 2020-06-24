import { Link, useStaticQuery, graphql } from "gatsby"
import React from "react"
import Img from "gatsby-image"

import "./header.scss"

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "EEBulle-logo.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <header>
      <div>
        <div className="logo-wrapper">
          <Link to="/">
            <Img fluid={data.placeholderImage.childImageSharp.fluid} />
          </Link>
        </div>
        <div className="links">
          <Link to="/">
            Home
          </Link>
          <Link to="/church">
            Eglise
          </Link>
          <Link to="/groups">
            Groupe de Maison
          </Link>
          <Link to="/activities">
            Activités
          </Link>
          <Link to="/contact">
            Contact
          </Link>
        </div>
      </div>
    </header >
  )
}

export default Header
