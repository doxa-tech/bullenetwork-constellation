import React, { useState, useEffect } from "react"
import Intro from "../components/intro"
import Layout from "../components/layout"
import Church from "./index/church"
import Tiles from "../components/tiles"

export default () => {
  const [title, setTitle] = useState(0)
  const [content, setContent] = useState(1)
  const [churches, setChurches] = useState(2)
  const [specialContent, setSpecialContent] = useState(3)
  useEffect(() => {
    setTitle(
      <div className="loadrr"><div><div></div><div></div><div></div><div></div></div></div>
    )
    setContent(
      '<div class="loadrr"><div><div></div><div></div><div></div><div></div></div></div>'
    )
    setSpecialContent('')
    fetch(`${process.env.GATSBY_DIRECTUS_ENDPOINT}/items/bullenetwork_pages/2`)
      .then(response => response.json())
      .then(resultData => {
        setTitle(resultData.data.title)
        setContent(resultData.data.content)
      })
    fetch(`${process.env.GATSBY_DIRECTUS_ENDPOINT}/items/bullenetwork_pages/6`)
      .then(response => response.json())
      .then(resultData => {
        if (resultData.data.status === "published") {
          setSpecialContent(resultData.data.content)
        }
      })
    fetch(`${process.env.GATSBY_DIRECTUS_ENDPOINT}/items/bullenetwork_churches`)
      .then(response => response.json())
      .then(resultData => {
        setChurches(resultData.data.map((church) =>
          <Church
            website={church.website}
            churchName={church.name}
            churchAddress={church.address}
            churchColor={church.color}
            imageID={church.logo}
            key={church.id}
          />
        ))
      })
  }, [])

  return (
    <Layout layoutClass="index-container">

      <section id="text-info">

        <div dangerouslySetInnerHTML={{ __html: specialContent }}>
        </div>

      </section>

      <Intro>
        {title}
      </Intro>

      <Tiles />

      <div className="separation"></div>

      <h2 id="commmunity-title">La communauté</h2>

      <section id="churches">
        <div className="section-container">
          <ul className="ch-grid">
            {churches}
          </ul>
        </div>
      </section>

      <section id="text-info">
        <div dangerouslySetInnerHTML={{ __html: content }} className="section-container" />
      </section>

    </Layout>
  )
}