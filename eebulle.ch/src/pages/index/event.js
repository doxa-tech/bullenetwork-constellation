import React from "react"

const Event = ({ imageID, content }) => {
  return (
    <div className="event">
      <div className="content" dangerouslySetInnerHTML={{ __html: content }} />

      <div className="image">
        <img src={`${process.env.GATSBY_DIRECTUS_ENDPOINT}/assets/${imageID}`} alt="L'événement" />
      </div>
    </div>
  )
}

export default Event