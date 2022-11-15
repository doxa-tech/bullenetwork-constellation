import * as React from "react"

import "./welcome.css"
import { graphql, useStaticQuery } from "gatsby"

const IndexWelcome = () => {
  const [event, setEvent] = React.useState("")

  const data = useStaticQuery(graphql`
  query {
    directus {
      o2vie_intro {
        id
        body
      }
    }
  }
  `)

  React.useEffect(() => {
    fetch(`${process.env.GATSBY_DIRECTUS_ENDPOINT}/items/o2vie_next_event`)
      .then(response => response.json())
      .then(resultData => {
        if (resultData.data.status === "published") {
          setEvent(<Event event={resultData.data} />)
        } else {
          setEvent(<i>Pas d'événement spécial à venir.</i>)
        }
      })
  }, [])

  return (
    <div id="main-wrapper" className="index-welcome">
      <div className="container">
        <div className="row gtr-200">
          <div className="col-7 col-12-medium imp-medium">

            <div id="content">
              <section className="last">
                <div dangerouslySetInnerHTML={{ __html: data.directus.o2vie_intro.body }} />
                <a href="/about" className="button icon solid fa-arrow-circle-right">En savoir plus</a>
              </section>
            </div>

          </div>
          <div className="col-5 col-12-medium imp-medium">
            <div id="sidebar">
              {event}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Event = ({ event }) => {
  return (
    <section className="next-event widget thumbnails">
      <h3>{event.title}</h3>
      <div dangerouslySetInnerHTML={{ __html: event.body }}></div>
      <img src={`${process.env.GATSBY_DIRECTUS_ENDPOINT}/assets/${event.image}`} alt="prochain événement" />
    </section>
  )
}

export default IndexWelcome
