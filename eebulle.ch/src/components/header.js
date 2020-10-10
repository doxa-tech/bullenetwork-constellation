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
          <Link to="/" activeClassName="active">
            Home
          </Link>
          <Link to="/church" activeClassName="active">
            Eglise
          </Link>
          <Link to="/groups" activeClassName="active">
            Groupe de Maison
          </Link>
          <Link to="/activities" activeClassName="active">
            Activités
          </Link>
          <Link to="/contact" activeClassName="active">
            Contact
          </Link>
        </div>
      </div>
    </header >
  )
}

export default Header
