import * as React from "react"
import PropTypes from "prop-types"

import "./layout.css"

import Header from "./header"
import Footer from "./footer"
import MobileHeader from "./mobile-header"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <MobileHeader />
      
      <div id="page-wrapper">{children}</div>
       
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
