import React, { useState, useEffect } from "react"
import Event from "./event"

import "./events.scss"

const Events = () => {

  const [content, setContent] = useState(0)
  useEffect(() => {
    setContent(
      <div className="loadrr"><div><div></div><div></div><div></div><div></div></div></div>
    )
    fetch(`${process.env.GATSBY_DIRECTUS_ENDPOINT}/items/eebulle_events`)
      .then(response => response.json())
      .then(resultData => {
        const result = resultData.data.filter((event) => event.status === "published").map((event) =>
          <Event imageID={event.image} content={event.content} key={event.id} />
        );
        console.log("content:", content)
        setContent(result)
      })
  }, [])

  return content.length !== 0 ?
    (<div className="event-container">

      <h2 id="events">Prochainement</h2>
      {content}

    </div>)
    : (<></>)
}

export default Events