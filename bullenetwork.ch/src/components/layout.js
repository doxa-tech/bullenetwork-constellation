import React from "react"
import Header from "./layout/header"
import { Helmet } from "react-helmet"
import Footer from "./layout/footer"

export default ({ layoutClass, children }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Le Bulle Network - Des communautés au service de son prochain</title>
      </Helmet>
      <Header />
      <div className={layoutClass}>
        {children}
      </div>
      <Footer />
    </div>
  )
}
