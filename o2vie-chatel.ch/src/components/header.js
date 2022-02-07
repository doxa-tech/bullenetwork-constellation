import * as React from "react"

import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Header = () => (
  <div id="header-wrapper">
    <header id="header" class="container">

      <div id="logo">
        <a href="/"><StaticImage src="../images/o2vie-logo.jpg" alt="logo" layout="fixed" width={250} /></a>
      </div>

      <nav id="nav">
        <ul>
          <li><Link activeClassName="current" to="/">Home</Link></li>
          <li><Link activeClassName="current" to="/activities">Activités</Link></li>
          <li><Link activeClassName="current" to="/about">A propos</Link></li>
        </ul>
      </nav>

    </header>
  </div>
)

export default Header
