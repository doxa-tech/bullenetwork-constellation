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

    {/* <SpecialEvent /> */}

    <IndexWelcome />

    <IndexActivities />

    <Instagram />

  </Layout>
)

export default IndexPage

const SpecialEvent = () => {
  return (
    <div id="main-wrapper" className="index-welcome" style={{ background: "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(0,180,61,0.09425777146796221) 100%)", position: "relative" }}>

      <div className="container">
        <div className="row gtr-200">
          <div className="col-7 col-12-medium imp-medium">

            <div id="content">
              <section className="last">
                <h2>title</h2>
                <div>
                  <p>
                    ...
                  </p>
                  <p>
                    <StaticImage src="../images/san 2022.jpg" alt="team" style={{ margin: 'auto', maxWidth: "100%" }} layout="constrained" width={500} />
                  </p>
                </div>
              </section>
            </div>

          </div>
          <div className="col-5 col-12-medium imp-medium">
            <div id="sidebar">
              <StaticImage src="../images/soupe avec nous 2022.png" alt="team" style={{ margin: 'auto', maxWidth: "100%" }} layout="constrained" width={380} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}