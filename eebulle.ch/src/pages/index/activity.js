import React from "react"
import Img from "gatsby-image"

import "./activity.scss"

const Activity = ({ fluidImg, title, description }) => {
  return (
    <div className="activity">
      <Img fluid={fluidImg} style={{ width: `150px`, flexShrink: `0` }} />
      <div className="text">
        <p>{description}</p>
        <h3>{title}</h3>
      </div>
    </div >
  )
}

export default Activity
