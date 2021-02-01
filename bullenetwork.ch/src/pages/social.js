import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import Intro from "../components/intro"
import Menu from "../components/menu"

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
    fetch(`https://panda.bullenetwork.ch/directus/items/bullenetwork_pages/5`)
      .then(response => response.json())
      .then(resultData => {
        setTitle(resultData.data.title)
        setContent(resultData.data.content)
      })
  }, [])
  return (
    <Layout layoutClass="index-container">
      <Menu />
      <Intro>
        {title}
      </Intro>
      <section id="text-info">
        <div dangerouslySetInnerHTML={{ __html: content }} className="section-container" />
      </section>
    </Layout>
  )
}
