import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import "./channels.scss"

export const channelImage = graphql`
  fragment channelImage on File {
    childImageSharp {
      fluid(maxWidth: 200) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`

const Channels = () => {
  const data = useStaticQuery(graphql`
    query {
      megaphone: file(relativePath: { eq: "channels/megaphone.png" }) {
        ...channelImage
      }
      youtube: file(relativePath: { eq: "channels/youtube.png" }) {
        ...channelImage
      }
      facebook: file(relativePath: { eq: "channels/facebook.png" }) {
        ...channelImage
      }
      ficus: file(relativePath: { eq: "channels/ficus.png" }) {
        ...channelImage
      }
    }
  `)

  return (
    <div className="channels">
      <div class="title">
        <Img fluid={data.megaphone.childImageSharp.fluid} style={{ width: "50px" }} />
        <p>Nos canaux de communication</p>
      </div>

      <div class="channel-wrap">
        <div class="youtube">
          <Img fluid={data.youtube.childImageSharp.fluid} style={{ width: "40px" }} />
          <p>Vidéos du thème du mois</p>
          <a href="https://www.youtube.com/channel/UCL_B5hW5uxe-0P8kPLma9gg" target="_blank" rel="noreferrer"></a>
        </div>

        <div class="facebook">
          <Img fluid={data.facebook.childImageSharp.fluid} style={{ width: "40px" }} />
          <p>Pour interagir et partager</p>
          <a href="https://www.facebook.com/eebulle" target="_blank" rel="noreferrer"></a>
        </div>

        <div class="my-eebulle">
          <Img fluid={data.ficus.childImageSharp.fluid} style={{ width: "40px" }} />
          <p>Infos & événements</p>
          <a href="https://ficus.eebulle.ch" target="_blank" rel="noreferrer"></a>
        </div>
      </div>
    </div>
  )
}

export default Channels