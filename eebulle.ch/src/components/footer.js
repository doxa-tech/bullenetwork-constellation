import React from "react"

import "./footer.scss"

const Footer = () => (
  <footer>
    <div className="container">
      © EEBulle {new Date().getFullYear()}
    </div>
  </footer>
)

export default Footer