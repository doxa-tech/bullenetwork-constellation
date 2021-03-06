/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import "normalize.css"

import Header from "./header"
import Footer from "./footer"
import "./layout.scss"

const Layout = ({ layoutClass, children }) => {
  return (
    <>
      <Header />

      <main className={layoutClass}>{children}</main>
      
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
