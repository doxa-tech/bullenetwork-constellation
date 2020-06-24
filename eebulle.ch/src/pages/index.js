import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Welcome from "./index/welcome"
import Banner from "./index/banner"
import Activities from "./index/activities"
import Event from "./index/event"

const Index = () => (
  <Layout layoutClass="index">
    <SEO title="Accueil" />
    <Welcome />
    <Banner />
    <Activities />
    <Event />
  </Layout>
)

export default Index
