import React from "react"
import BackgroundImage from "gatsby-background-image"

import style from "./banner.module.scss"

export default ({ fluidImg, children }) => {
  return (
    <div className="banner">
      <BackgroundImage
        Tag="section"
        fluid={fluidImg}
        backgroundColor={`grey`}
        style={{
          width: "100%",
        }}
      >
        <div className={style.banner}>
          {children}
        </div>
      </BackgroundImage>
    </div>
  )
}
