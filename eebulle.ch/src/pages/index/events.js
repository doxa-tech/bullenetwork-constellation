import React, { useState, useEffect } from "react"
import Event from "./event"

import "./events.scss"

const Events = () => {

  const [content, setContent] = useState(0)
  useEffect(() => {
    setContent(
      <div className="loadrr"><div><div></div><div></div><div></div><div></div></div></div>
    )
    fetch(`https://panda.bullenetwork.ch/directus/items/eebulle_events`)
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

      <h2>Prochainement</h2>
      {content}

    </div>
  )
}

export default Events