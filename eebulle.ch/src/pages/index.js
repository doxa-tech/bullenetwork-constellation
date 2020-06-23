import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Intro from "./index/intro"
import Banner from "./index/banner"
import Activities from "./index/activities"

import "./index.scss"

const IndexPage = () => (
  <Layout layoutClass="index">
    <SEO title="Accueil" />
    <Intro />
    <Banner />
    <Activities />
  </Layout>
)

export default IndexPage
