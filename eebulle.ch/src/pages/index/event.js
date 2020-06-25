import React from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

import "./event.scss"

const Event = () => {
  const data = useStaticQuery(graphql`
    query {
      image: file(relativePath: { eq: "directus.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <div className="event">

      <h2>Prochainement</h2>
      <div className="content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et dolor sit amet quam tincidunt molestie. Aenean porttitor eget metus eget viverra. Curabitur facilisis, diam vel lacinia hendrerit, orci tortor pharetra diam, a tempor libero eros nec enim. Donec et interdum leo. Ut non pulvinar ipsum, et luctus massa. Ut vitae tortor magna. Aenean sit amet lacus ex. Etiam ultricies metus non velit dapibus gravida. Etiam semper, mauris quis dapibus vulputate, nunc lorem pellentesque diam, ut ultricies leo turpis id nisi. Phasellus tempor luctus ligula, vel elementum est tincidunt elementum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et lectus ut justo volutpat interdum sit amet in est
        </p>
        <Img fluid={data.image.childImageSharp.fluid} style={{ width: `300px`, flexShrink: 0 }} />
      </div>

    </div>
  )
}

export default Event