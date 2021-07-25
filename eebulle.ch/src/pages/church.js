import React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Mission from "./church/mission"
import Vision from "./church/vision"
import Leadership from "./church/leadership" 
import History from "./church/history"
import Network from "./church/network"

const Church = () => (
  <Layout layoutClass="church">
    <Seo title="Eglise" />
    <Mission />
    <Vision />
    <Leadership />
    <History />
    <Network />
  </Layout>
)

export default Church