import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Welcome from "./index/welcome"
import Activities from "./index/activities"
import Events from "./index/events"

const Index = () => (
  <Layout layoutClass="index">
    <SEO title="Accueil" />
    <Welcome />
    <Activities />
    <Events />
  </Layout>
)

export default Index
