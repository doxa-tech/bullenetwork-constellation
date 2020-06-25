import React from "react"
import Img from "gatsby-image"

import style from "./tile.module.scss"

const Tile = ({ fluidImg, title, children }) => (
  <div className={style.tile}>
    <Img fluid={fluidImg} style={{ width: `300px`, flexShrink: 0 }} />
    <div className={style.text}>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  </div>
)

export default Tile