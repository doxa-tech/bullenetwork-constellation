import React, { useState, useEffect } from "react"
import Event from "./event"

import "./events.scss"

const Events = () => {

  const [content, setContent] = useState("")
  useEffect(() => {
    fetch(`https://panda.bullenetwork.ch/directus/items/eebulle_events?filter[status][eq]=published`)
      .then(response => response.json())
      .then(resultData => {
        const result = resultData.data.map((event) =>
          <Event imageID={event.image} content={event.content} key={event.id} />
        );
        setContent(result)
      })
  }, [])

  return (
    <div className="event-container">
      {content != "" && <>
        <h2 id="events">Prochainement</h2>
        {content}
      </>}
    </div>
  )
}

export default Events