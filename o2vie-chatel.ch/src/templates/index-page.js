import React, { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import { RiArrowRightSLine } from "react-icons/ri"

import Layout from "../components/layout"
import BlogListHome from "../components/blog-list-home"
import SEO from "../components/seo"

// https://panda.bullenetwork.ch/directus/items/o2viechatelch_pages/1

const HomePage = ({ data }) => {

  const [content, setContent] = useState(0)
  const [imageURL, setImageURL] = useState(1)
  useEffect(() => {
    fetch(`https://panda.bullenetwork.ch/directus/items/o2viechatelch_pages/1`)
      .then(response => response.json())
      .then(resultData => {
        setContent(resultData.data)
        fetch(`https://panda.bullenetwork.ch/directus/files/${resultData.data.image}`)
          .then(response => response.json())
          .then(resultData => {
            setImageURL(resultData.data.data.full_url)
          })
      })
  })

  return (
    <Layout>
      <SEO />
      <div className="home-banner grids col-1 sm-2">
        <div>
          <h1 class="title">{content.title}</h1>
          <p class="tagline">{content.subtitle}</p>
          <div className="description" dangerouslySetInnerHTML={{ __html: content.content }} />
          <Link to="about" className="button">En savoir plus<span class="icon -right"><RiArrowRightSLine /></span></Link>
        </div>
        <div>
          <img src={imageURL} className="feature-image" />
        </div>
      </div>
      <BlogListHome />
    </Layout>
  )
}

export default HomePage
