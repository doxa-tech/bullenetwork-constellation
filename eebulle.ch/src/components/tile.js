import React from "react"
import Img from "gatsby-image"

import { tile, imageStd, text, image } from "./tile.module.scss"

export const Tile = ({ fluidImg, title, children }) => (
  <div className={tile}>
    <Img fluid={fluidImg} className={imageStd} />
    <div className={text}>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  </div>
)

export const TilePure = ({ imageURL, title, children }) => (
  <div className={tile}>
    <div className={image} style={{
      backgroundImage: `url(${imageURL}`,
    }}>

    </div>
    <div className={text}>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  </div>
)