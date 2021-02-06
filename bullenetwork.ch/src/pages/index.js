import React, { useState, useEffect } from "react"
import Intro from "../components/intro"
import Layout from "../components/layout"
import Church from "./index/church"
import Tiles from "../components/tiles"

export default () => {
  const [title, setTitle] = useState(0)
  const [content, setContent] = useState(1)
  const [churches, setChurches] = useState(2)
  // const [specialContent, setSpecialContent] = useState(3)
  useEffect(() => {
    setTitle(
      <div className="loadrr"><div><div></div><div></div><div></div><div></div></div></div>
    )
    setContent(
      '<div class="loadrr"><div><div></div><div></div><div></div><div></div></div></div>'
    )
    // setSpecialContent(
    //   '<div class="loadrr"><div><div></div><div></div><div></div><div></div></div></div>'
    // )
    fetch(`https://panda.bullenetwork.ch/directus/items/bullenetwork_pages/2`)
      .then(response => response.json())
      .then(resultData => {
        setTitle(resultData.data.title)
        setContent(resultData.data.content)
      })
    // fetch(`https://panda.bullenetwork.ch/directus/items/bullenetwork_pages/3`)
    //   .then(response => response.json())
    //   .then(resultData => {
    //     setSpecialContent(resultData.data.content)
    //   })
    fetch(`https://panda.bullenetwork.ch/directus/items/bullenetwork_churches`)
      .then(response => response.json())
      .then(resultData => {
        setChurches(resultData.data.map((church) =>
          <Church
            website={church.website}
            churchName={church.church_name}
            churchAddress={church.church_address}
            churchColor={church.church_color}
            imageID={church.church_logo}
          />
        ))
      })
  }, [])

  return (
    <Layout layoutClass="index-container">

      <Intro>
        {/* {title} */}
        Le Bulle Network est un réseau de communautés au service de son prochain.
      </Intro>

      <Tiles />

      {/* <section id="text-info">

        <div dangerouslySetInnerHTML={{ __html: specialContent }} className="section-container" style={{ border: "2px solid orange", background: "rgb(255, 243, 220)", margin: "30px 0 0 0", padding: "30px" }}>
        </div>

      </section> */}

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