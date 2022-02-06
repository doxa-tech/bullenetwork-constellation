import * as React from "react"

const Header = () => (
  <div id="header-wrapper">
    <header id="header" class="container">

      <div id="logo">
        <h1><a href="index.html">Verti</a></h1>
        <span>Génération d'énergie</span>
      </div>

      <nav id="nav">
        <ul>
          <li class="current"><a href="index.html">Welcome</a></li>
          <li><a href="no-sidebar.html">No Sidebar</a></li>
        </ul>
      </nav>

    </header>
  </div>
)

export default Header
