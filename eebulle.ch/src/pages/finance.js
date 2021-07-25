import React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import Banner from "./finance/banner"
import Details from "./finance/details"

const Finance = () => (
  <Layout layoutClass="finance">
    <Seo title="Finance" />
    <Banner />
    <Details />
  </Layout>
)

export default Finance