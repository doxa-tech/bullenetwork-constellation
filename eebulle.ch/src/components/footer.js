import React from "react"

import "./footer.scss"

const Footer = () => (
  <footer>
    <div className="container">
      <div>
        <p>Église évangélique de Bulle</p>
        <p>Route du Verdel 8</p>
        <p>1630 Bulle</p>
        <p>Bâtiment Riedo, 1er étage</p>
        <p>CCP 17-559407-8 </p>
      </div>

      © EEBulle {new Date().getFullYear()}
    </div>
  </footer>
)

export default Footer