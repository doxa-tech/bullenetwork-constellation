import * as React from "react"
import CSS from "./About.module.css"

import { useState } from "react"
import { useEffect } from "react"
import ProgressiveImg from "../../components/ProgressiveImg"

const AboutPage = () => {
  const [content, setContent] = useState();

  useEffect(() => {
    fetch(`${import.meta.env.PUBLIC_DIRECTUS_ENDPOINT}/graphql`, {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contentQuery)
    }).then((req) => {
      return req.json();
    }).then((response) => {
      if (response.errors) {
        alert("Error:" + JSON.stringify(response.errors))
      } else {
        setContent(response.data.o2vie_about)
      }
    })
  }, [])

  const contentQuery = {
    "query": `query {
      o2vie_about {
        id
        body
        image {
          id
        }
      }
    }`
  }

  return (
    <>
      {content && (<div className={CSS.image}>
        <ProgressiveImg
          src={`${import.meta.env.PUBLIC_DIRECTUS_ENDPOINT}/assets/${content.image.id}`}
          placeholderSrc={`${import.meta.env.PUBLIC_DIRECTUS_ENDPOINT}/assets/${content.image.id}?key=lowqual`}
        />

        <article dangerouslySetInnerHTML={{ __html: content.body }} />
      </div>)}
    </>
  )
}

export default AboutPage
