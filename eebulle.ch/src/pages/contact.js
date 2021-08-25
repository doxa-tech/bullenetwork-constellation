import React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Map from "./contact/map"
import Info from "./contact/info"
import Channels from "./contact/channels"
import Banner from "./contact/banner"

const Contact = () => (
  <Layout layoutClass="contact">
    <Seo title="Contact" />
    <Banner />
    <Info />
    <Channels />
    <Map />
  </Layout>
)

export default Contact