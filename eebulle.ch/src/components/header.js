import { Link, useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Img from "gatsby-image"

import "./header.scss"

const Header = ({ siteTitle }) => {
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
          <Link to="/">
            Eglise
          </Link>
          <Link to="/">
            Groupe de Maison
          </Link>
          <Link to="/">
            Activités
          </Link>
          <Link to="/">
            Contact
          </Link>
        </div>
      </div>
    </header >
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
