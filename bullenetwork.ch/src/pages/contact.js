import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import Intro from "../components/intro"

export default () => {
  const [title, setTitle] = useState(0)
  const [content, setContent] = useState(1)
  useEffect(() => {
    setTitle(
      <div className="loadrr"><div><div></div><div></div><div></div><div></div></div></div>
    )
    setContent(
      '<div class="loadrr"><div><div></div><div></div><div></div><div></div></div></div>'
    )
    fetch(`${process.env.DIRECTUS_ENDPOINT}/items/bullenetwork_pages/3`)
      .then(response => response.json())
      .then(resultData => {
        setTitle(resultData.data.title)
        setContent(resultData.data.content)
      })
  }, [])
  return (
    <Layout layoutClass="index-container">
      <Intro>
        {title}
      </Intro>
      <section id="text-info">
        <div dangerouslySetInnerHTML={{ __html: content }} className="section-container" />
      </section>
    </Layout>
  )
}
