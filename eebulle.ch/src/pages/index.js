import React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import Welcome from "./index/welcome"
import Activities from "./index/activities"
import Events from "./index/events"

import Img from "gatsby-image"

import { useStaticQuery, graphql } from "gatsby"

import "./index.scss"

const Index = () => {
  const img = useStaticQuery(graphql`
    query {
      desktop: file(relativePath: { eq: "live.png" }) {
        childImageSharp {
          fixed(width: 30) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <Layout layoutClass="index">
      <Seo title="Accueil" />

      <a className="top-link" href="https://www.youtube.com/channel/UCL_B5hW5uxe-0P8kPLma9gg" target="_blank" rel="noreferrer">
        <div className="top-info">
          <Img fixed={img.desktop.childImageSharp.fixed} /> <span class="txt">La diffusion des célébrations en live reprend en septembre !</span>
        </div>
      </a>

      <Welcome />
      <Activities />
      <Events />
    </Layout>
  )
}

export default Index
