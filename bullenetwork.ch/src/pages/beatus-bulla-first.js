import React, { useState, useEffect } from "react"
import Layout from "../components/layout-small"
import { StaticImage } from "gatsby-plugin-image"

const Beatus = () => {
  const [title, setTitle] = useState(0)
  const [content, setContent] = useState(1)
  useEffect(() => {
    setTitle(
      <div className="loadrr"><div><div></div><div></div><div></div><div></div></div></div>
    )
    setContent(
      '<div class="loadrr"><div><div></div><div></div><div></div><div></div></div></div>'
    )
    fetch(`https://panda.bullenetwork.ch/directus/items/bullenetwork_pages/9`)
      .then(response => response.json())
      .then(resultData => {
        setTitle(resultData.data.title)
        setContent(resultData.data.content)
      })
  }, [])
  return (
    <Layout layoutClass="secondary-layout beer-page" title="Beatus Bulla - First" >
      <section className="main-section beer">
        <div className="section-container">
          <p className="banner-holder">
            <StaticImage src="../images/beer/beatus-banner.png" alt="beatus" className="banner" />
          </p>
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content }} />
          <p className="footer-holder">
            <StaticImage src="../images/beer/beatus-footer.png" alt="beatus" className="footer" />
          </p>
        </div>
      </section>
    </Layout>
  )
}

export default Beatus