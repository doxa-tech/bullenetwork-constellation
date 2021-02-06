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
          <p style={{ display: "flex", alignItems: "center" }}>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              width="35px" height="35px" viewBox="0 0 35 35">
              <g>
                <path d="M25.302,0H9.698c-1.3,0-2.364,1.063-2.364,2.364v30.271C7.334,33.936,8.398,35,9.698,35h15.604
		c1.3,0,2.364-1.062,2.364-2.364V2.364C27.666,1.063,26.602,0,25.302,0z M15.004,1.704h4.992c0.158,0,0.286,0.128,0.286,0.287
		c0,0.158-0.128,0.286-0.286,0.286h-4.992c-0.158,0-0.286-0.128-0.286-0.286C14.718,1.832,14.846,1.704,15.004,1.704z M17.5,33.818
		c-0.653,0-1.182-0.529-1.182-1.183s0.529-1.182,1.182-1.182s1.182,0.528,1.182,1.182S18.153,33.818,17.5,33.818z M26.021,30.625
		H8.979V3.749h17.042V30.625z"/>
              </g>
            </svg>
            <a href="/ficus">Application Ficus</a>
          </p>
        </div>
      </section>
    </div>
  )
}
