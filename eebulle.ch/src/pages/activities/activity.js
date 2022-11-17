import React from "react"
import { TilePure } from "../../components/tile"

const Activity = ({ imageID, title, description }) => {
  return (
    <TilePure imageURL={`${process.env.GATSBY_DIRECTUS_ENDPOINT}/assets/${imageID}`} title={title}>
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </TilePure>
  )
}

export default Activity
