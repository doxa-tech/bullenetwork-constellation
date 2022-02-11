import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import "./activities.css"

const ActivitiesPage = () => (
  <Layout>
    <Seo title="Activités" />

    <div id="main-wrapper" class="activities">
      <div class="container">
        <div id="content">
          <h2>Nos activités</h2>
          <h4>Découvre nos activités à Châtel et dans la région.</h4>
        </div>
      </div>
    </div>
    
    <div id="features-wrapper">
      <div class="container">
        <div class="row">
          <div class="col-6 col-12-medium">

            <section class="box feature">
              <a href="#" class="image featured"><img src="images/pic01.jpg" alt="" /></a>
              <div class="inner">
                <header>
                  <h2>Put something here</h2>
                  <p>Maybe here as well I think</p>
                </header>
                <p>Phasellus quam turpis, feugiat sit amet in, hendrerit in lectus. Praesent sed semper amet bibendum tristique fringilla.</p>
              </div>
            </section>

          </div>
          <div class="col-6 col-12-medium">

            <section class="box feature">
              <a href="#" class="image featured"><img src="images/pic02.jpg" alt="" /></a>
              <div class="inner">
                <header>
                  <h2>An interesting title</h2>
                  <p>This is also an interesting subtitle</p>
                </header>
                <p>Phasellus quam turpis, feugiat sit amet in, hendrerit in lectus. Praesent sed semper amet bibendum tristique fringilla.</p>
              </div>
            </section>

          </div>
          <div class="col-6 col-12-medium">

            <section class="box feature">
              <a href="#" class="image featured"><img src="images/pic03.jpg" alt="" /></a>
              <div class="inner">
                <header>
                  <h2>Oh, and finally ...</h2>
                  <p>Here's another intriguing subtitle</p>
                </header>
                <p>Phasellus quam turpis, feugiat sit amet in, hendrerit in lectus. Praesent sed semper amet bibendum tristique fringilla.</p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  </Layout>
)

export default ActivitiesPage
