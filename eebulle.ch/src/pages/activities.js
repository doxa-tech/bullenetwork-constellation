import React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Banner from "./activities/banner"
import List from "./activities/list"

const Activities = () => (
  <Layout layoutClass="activities">
    <Seo title="Activités" />
    <Banner />
    <List />
  </Layout>
)

export default Activities