import * as React from "react"

import "./welcome.css"
import { graphql, useStaticQuery } from "gatsby"

const IndexWelcome = () => {
  const [event, setEvent] = React.useState("")

  const data = useStaticQuery(graphql`
  query {
    directus {
      O2vie_Intro {
        id
        body
      }
    }
  }
  `)

  React.useEffect(() => {
    fetch(`https://truite.bullenetwork.ch/items/O2vie_Next_Event`)
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
          <div className="col-8 col-12-medium imp-medium">

            <div id="content">
              <section className="last">
                <div dangerouslySetInnerHTML={{ __html: data.directus.O2vie_Intro.body }} />
                <a href="/about" className="button icon solid fa-arrow-circle-right">En savoir plus</a>
              </section>
            </div>

          </div>
          <div className="col-4 col-12-medium imp-medium">
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
  const [image, setImage] = React.useState("#")

  React.useEffect(() => {
    fetch(`https://truite.bullenetwork.ch/files/${event.image}`)
      .then(response => response.json())
      .then(resultData => {
        setImage(`https://storage.googleapis.com/bullenetwork-directus-truite/${resultData.data.filename_disk}`)
      })
  })

  return (
    <section className="next-event widget thumbnails">
      <h3>{event.title}</h3>
      <div dangerouslySetInnerHTML={{ __html: event.body }}></div>
      {image !== "#" && <img src={image} alt="prochain événement" />}
    </section>
  )
}

export default IndexWelcome
