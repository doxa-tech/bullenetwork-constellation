import React from "react"
import Header from "./layout/header"

export default ({ layoutClass, children }) => {
  console.log(layoutClass, children)
  return (
    <div>
      <Header/>
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
