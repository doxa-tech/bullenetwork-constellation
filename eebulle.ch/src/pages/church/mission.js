import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { IntroLeft, IntroRight } from "../../components/intro"
import BannerCMP from "../../components/banner"

import "./mission.scss"

const Mission = () => {
  const img = useStaticQuery(graphql`
    query {
      desktop: file(relativePath: { eq: "church/banner.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
    }
  `)

  return (
    <BannerCMP fluidImg={img.desktop.childImageSharp.fluid}>
      <div className="mission">
        <div className="container">
          <div className="intro-left-wrapper">
            <IntroLeft>
              <div className="intro-wrapper">
                <h2>Notre mission</h2>
                <p>Nous accueillons notre prochain et nous encourageons chacun à connaître et servir Jésus-Christ !</p>
              </div>
            </IntroLeft>
          </div>
          <div className="intro-right-wrapper">
            <IntroRight>
              <div className="intro-wrapper">
                <h2>Nos valeurs clés</h2>
                <ul>
                  <li>L'Amour: Nous aimons Dieu et notre prochain</li>
                  <li>La solidarité: Nous prenons soin les uns des autres</li>
                  <li>La progression: Nous sommes une église formatrice</li>
                </ul>
              </div>
            </IntroRight>
          </div>
          <div className="slogan">
            <p>Notre slogan</p>
            <h2>"La force de Jésus en toi !" (Ps. 92:11)</h2>
          </div>
        </div>
      </div>
    </BannerCMP>
  )
}

export default Mission