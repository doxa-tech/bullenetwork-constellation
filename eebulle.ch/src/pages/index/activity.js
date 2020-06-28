import React, { useState, useEffect } from "react"

import "./activity.scss"

const Activity = ({ imageID, title, description }) => {

  const [imageURL, setImageURL] = useState(0)
  useEffect(() => {
    fetch(`https://panda.bullenetwork.ch/directus/files/${imageID}`)
      .then(response => response.json())
      .then(resultData => {
        setImageURL(resultData.data.data.full_url)
      })
  })

  return (
    <div className="activity">
      <img src="" />
      <div className="text">
        <p>{description}</p>
        <h3>{title}</h3>
      </div>
      <div class="image" style={{
        backgroundImage: `url(${imageURL}`,
      }}>
      </div>
    </div >
  )
}

export default Activity
