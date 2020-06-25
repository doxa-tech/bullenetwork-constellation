import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Map from "./contact/map"
import Info from "./contact/info"
import Channels from "./contact/channels"

const Contact = () => (
  <Layout layoutClass="contact">
    <SEO title="Contact" />
    <Info />
    <Channels />
    <Map />
  </Layout>
)

export default Contact