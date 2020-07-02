import React, { useState, useEffect } from "react"

const Event = ({ imageID, content }) => {

  const [imageURL, setImageURL] = useState(0)
  useEffect(() => {
    fetch(`https://panda.bullenetwork.ch/directus/files/${imageID}`)
      .then(response => response.json())
      .then(resultData => {
        setImageURL(resultData.data.data.full_url)
      })
  })

  return (
    <div className="event">
      <div className="content" dangerouslySetInnerHTML={{ __html: content }} />

      <div className="image">
        <img src={imageURL} alt="L'événement"/>
      </div>
    </div>
  )
}

export default Event