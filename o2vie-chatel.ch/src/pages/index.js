import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import IndexActivities from "./index/activities"
import IndexWelcome from "./index/welcome"

import { StaticImage } from "gatsby-plugin-image"
import Instagram from "../components/instagram"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />

    <div id="banner-wrapper">
      <div id="banner" className="box container">
        <div className="row">
          <div className="col-7 col-12-medium">
            <h2>O2Vie</h2>
            <h3>Châtel-St-Denis </h3>
            <p>Une association chrétienne au service de sa région.</p>
          </div>
          <div className="col-5 col-12-medium">
            <StaticImage src="../images/team.png" alt="team" style={{ margin: 'auto' }} layout="fixed" width={280} />
          </div>
        </div>
      </div>
    </div>

    <IndexWelcome />

    <IndexActivities />

    <Instagram />

  </Layout>
)

export default IndexPage