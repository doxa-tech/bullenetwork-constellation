import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Banner from "./finance/banner"
import Details from "./finance/details"

const Finance = () => (
  <Layout layoutClass="finance">
    <SEO title="Finance" />
    <Banner />
    <Details />
  </Layout>
)

export default Finance