import React from "react"
import BannerBG from './banner-bg'

import "./banner.scss"

const Banner = () => (
  <div className="banner">
    <BannerBG>
      <div className="container">
        <p>pourquoi l'EEBulle?</p>
        <h2>"Parce que la Vie est éternelle"</h2>
      </div>
    </BannerBG>
  </div>
)

export default Banner
