import React from "react"
import Img from "gatsby-image"

import "./activity.scss"

const Activity = ({ fluidImg, title, description }) => {
  return (
    <div className="activity">
      <Img fluid={fluidImg} style={{ width: `300px` }} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div >
  )
}

export default Activity
