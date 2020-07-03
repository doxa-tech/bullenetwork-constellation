import React from "react"
import Header from "./layout/header"
import { Helmet } from "react-helmet"

export default ({ layoutClass, children }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Le Bulle Network - Réseau d'églises de l'EEBulle</title>
      </Helmet>
      <Header />
      <div className={layoutClass}>
        {children}
      </div>
      <section id="footer">
        <div className="ribbon"></div>
        <div className="section-container">
          <p>© Association Eglise évangélique de Bulle</p>
          <p>Route du Verdel 8, 1630 Bulle</p>
          <p>Contact: david.hausmann@bullenetwork.ch</p>
        </div>
      </section>
    </div>
  )
}
