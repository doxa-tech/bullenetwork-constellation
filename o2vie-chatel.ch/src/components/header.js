import * as React from "react"

import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Header = () => (
  <div id="header-wrapper">
    <header id="header" className="container">

      <div id="logo">
        <a href="/"><StaticImage src="../images/o2vie-logo.png" alt="logo" layout="fixed" width={300} /></a>
      </div>

      <nav id="nav">
        <ul>
          <li><Link activeClassName="current" to="/">Accueil</Link></li>
          <li><Link activeClassName="current" to="/activities">Activités</Link></li>
          <li><Link activeClassName="current" to="/about">A propos</Link></li>
        </ul>
      </nav>

    </header>
  </div>
)

export default Header
