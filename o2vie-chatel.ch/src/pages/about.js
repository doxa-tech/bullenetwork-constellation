import * as React from "react"
import * as styles from "./about.module.css"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { useState } from "react"
import { useEffect } from "react"
import ProgressiveImg from "../components/progressiveImg"

const AboutPage = () => {
  const [content, setContent] = useState();

  useEffect(() => {
    fetch(`${process.env.GATSBY_DIRECTUS_ENDPOINT}/graphql`, {
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
    <Layout>
      <Seo title="A propos" />

      <div id="main-wrapper">
        <div className="container">
          <div id="content">
            {content && (<div className={styles.image}>
              <ProgressiveImg
                src={`${process.env.GATSBY_DIRECTUS_ENDPOINT}/assets/${content.image.id}`}
                placeholderSrc={`${process.env.GATSBY_DIRECTUS_ENDPOINT}/assets/${content.image.id}?key=lowqual`}
              />

              <article dangerouslySetInnerHTML={{ __html: content.body }} />
            </div>)}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage
