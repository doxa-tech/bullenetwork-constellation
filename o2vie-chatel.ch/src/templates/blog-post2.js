import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import { RiArrowRightLine, RiArrowLeftLine } from "react-icons/ri"

import Layout from "../components/layout"
import SEO from '../components/seo';

export default ({ data }) => {
  const activity = data.allSitePage.edges[0].node.context

  const [imageURL, setImageURL] = useState(0)
  useEffect(() => {
    fetch(`https://panda.bullenetwork.ch/directus/files/${activity.image}`)
      .then(response => response.json())
      .then(resultData => {
        setImageURL(resultData.data.data.full_url)
      })
  })

  return (
    <Layout className="page">
      <SEO
        title={activity.title}
        description={activity.description}
        article={true}
      />
      <article className="blog-post">
        <header className="featured-banner">
          <section className="article-header">
            <h1>{activity.title}</h1>
          </section>
          <img src={imageURL} alt="image of event" />
        </header>

        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: activity.content }}
        />
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($path: String!) {
    allSitePage(filter: { path: { eq: $path } }) {
      edges {
        node {
          context {
            description
            image
            content
            featuredimage
            title
          }
        }
      }
    }
  }
`