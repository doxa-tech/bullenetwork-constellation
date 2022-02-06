import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />

    <div id="banner-wrapper">
      <div id="banner" class="box container">
        <div class="row">
          <div class="col-7 col-12-medium">
            <h2>Hi. This is Verti.</h2>
            <p>It's a free responsive site template by HTML5 UP</p>
          </div>
          <div class="col-5 col-12-medium">
            <ul>
              <li><a href="#" class="button large icon solid fa-arrow-circle-right">Ok let's go</a></li>
              <li><a href="#" class="button alt large icon solid fa-question-circle">More info</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
  </Layout>
)

export default IndexPage
