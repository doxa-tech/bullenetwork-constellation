import * as React from "react"

import { Link } from "gatsby"

const MobileHeader = () => {
  const [openClassName, setOpenClassName] = React.useState("");

  const toggleHeader = () => {
    if (openClassName === "") {
      setOpenClassName("navPanel-visible");
    } else {
      setOpenClassName("");
    }

  }

  return (
    <div className={openClassName}>
      <div id="navToggle">
        <button className="toggle" onClick={toggleHeader} aria-label="menu"></button>
      </div>

      <div id="navPanel">
        <nav>
          <Link activeClassName="current" className="link" to="/">Accueil</Link>
          <Link activeClassName="current" className="link" to="/activities">Activités</Link>
          <Link activeClassName="current" className="link" to="/about">A propos</Link>
        </nav>
      </div>
    </div>
  )
}

export default MobileHeader
