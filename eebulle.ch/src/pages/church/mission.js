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
                <p>Manifester la puissance libératrice de Jésus-Christ et faire croître Son Royaume au-delà du canton de Fribourg!</p>
              </div>
            </IntroLeft>
          </div>
          <div className="intro-right-wrapper">
            <IntroRight>
              <div className="intro-wrapper">
                <h2>Nos valeurs clés</h2>
                <ul>
                  <li>La connexion à Dieu</li>
                  <li>La connexion aux autres</li>
                  <li>L'encouragement mutuel et collectif</li>
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