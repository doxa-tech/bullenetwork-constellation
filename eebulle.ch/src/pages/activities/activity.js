import React, { useState, useEffect } from "react"
import { TilePure } from "../../components/tile"

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
    <TilePure imageURL={imageURL} title={title}>
      {description}
    </TilePure>
  )
}

export default Activity
