import React from "react"

import "./activity.scss"

const Activity = ({ imageID, title, description }) => {
  return (
    <div className="activity">
      <div className="text">
        <p dangerouslySetInnerHTML={{ __html: description }} />
        <h3>{title}</h3>
      </div>
      <div className="image" style={{
        backgroundImage: `url(${process.env.GATSBY_DIRECTUS_ENDPOINT}/assets/${imageID}`,
      }}>
      </div>
    </div >
  )
}

export default Activity
