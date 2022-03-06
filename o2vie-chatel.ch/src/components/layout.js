import * as React from "react"
import PropTypes from "prop-types"

import "./layout.css"

import Header from "./header"
import Footer from "./footer"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      
      <div id="page-wrapper">{children}</div>
       
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
