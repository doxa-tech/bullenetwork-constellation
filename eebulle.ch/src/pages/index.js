import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

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
      <SEO title="Accueil" />

      <a className="top-link" href="https://www.youtube.com/channel/UCL_B5hW5uxe-0P8kPLma9gg" target="_blank">
        <div className="top-info">
          <Img fixed={img.desktop.childImageSharp.fixed} /> <span class="txt">Clique ici et retrouve tous les dimanches dès 10h45 la célébration en live</span>
        </div>
      </a>

      <Welcome />
      <Activities />
      <Events />
    </Layout>
  )
}

export default Index
