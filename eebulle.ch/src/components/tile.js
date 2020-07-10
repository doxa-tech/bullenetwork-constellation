import React from "react"
import Img from "gatsby-image"

import style from "./tile.module.scss"

export const Tile = ({ fluidImg, title, children }) => (
  <div className={style.tile}>
    <Img fluid={fluidImg} className={style.imageStd} />
    <div className={style.text}>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  </div>
)

export const TilePure = ({ imageURL, title, children }) => (
  <div className={style.tile}>
    <div className={style.image} style={{
      backgroundImage: `url(${imageURL}`,
    }}>

    </div>
    <div className={style.text}>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  </div>
)