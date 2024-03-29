import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import "./footer.scss"
import Img from "gatsby-image"

export const footerIcon = graphql`
  fragment footerIcon on File {
    childImageSharp {
      fixed(height: 25) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      youtube: file(relativePath: { eq: "channels/youtube.png" }) {
        ...footerIcon
      }
      facebook: file(relativePath: { eq: "channels/facebook.png" }) {
        ...footerIcon
      }
      ficus: file(relativePath: { eq: "channels/ficus.png" }) {
        ...footerIcon
      }
    }
  `)

  const version = process.env.GATSBY_APP_VERSION || "v0.0.0"
  const buildURL = process.env.GATSBY_BUILD_URL || "#"
  const shortSHA = process.env.GATSBY_SHORT_SHA || "xxx"
  const buildDate = process.env.GATSBY_BUILD_DATE || "1.1.1970"

  return (
    <footer>
      <div className="container">
        <div className="columns">
          <div className="column">
            <h4>Église évangélique de Bulle</h4>
            <p>Route du Verdel 8</p>
            <p>1630 Bulle</p>
            <p>Bâtiment Riedo, 1er étage</p>
            <br />
            <p>CCP 17-559407-8 </p>
            <Link to="/finance">En savoir plus sur nos finances</Link>
          </div>

          <div className="column networks">
            <div className="wrapper">
              <h4>Nos réseaux</h4>
              <a href="https://www.youtube.com/channel/UCL_B5hW5uxe-0P8kPLma9gg" target="_blank" rel="noreferrer">
                <Img fixed={data.youtube.childImageSharp.fixed} />
              </a>
              <a href="https://www.facebook.com/eebulle" target="_blank" rel="noreferrer">
                <Img fixed={data.facebook.childImageSharp.fixed} />
              </a>
              <a href="https://ficus.eebulle.ch" target="_blank" rel="noreferrer">
                <Img fixed={data.ficus.childImageSharp.fixed} />
              </a>
            </div>
          </div>

          <div className="column bn-network">
            <div className="wrapper">
              <h4><a href="https://bullenetwork.ch" target="_blank" rel="noreferrer">Le Bulle Network</a></h4>
              <p><a href="https://eebulle.ch" target="_blank" rel="noreferrer">Bulle</a></p>
              <p><a href="https://eglisesurleroc.ch" target="_blank" rel="noreferrer">Fribourg</a></p>
              <p><a href="https://eeromont.ch" target="_blank" rel="noreferrer">Romont</a></p>
              <p><a href="https://o2vie-chatel.ch" target="_blank" rel="noreferrer">Châtel-Saint-Denis</a></p>
              <p><a href="https://enhaut.eebulle.ch" target="_blank" rel="noreferrer">Pays d'Enhaut</a></p>
            </div>
          </div>
        </div>

        <p className="copyright">
          © EEBulle {new Date().getFullYear()}<br />
          <span className="version"><a href={`https://github.com/doxa-tech/bullenetwork-constellation/releases/tag/${version}`} target="_blank">{version}</a> - <a href={buildURL} target="_blank">{shortSHA}</a> - ({buildDate})</span>
        </p>
      </div>
    </footer>
  )
}

export default Footer