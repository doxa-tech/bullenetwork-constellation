import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Tile from "../../components/tile"

import "./list.scss"

const List = () => {
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
    <div className="list">
      <div className="container">
        <h2>Nos activités</h2>
        <h3>Pour tous</h3>
        <Tile fluidImg={data.image.childImageSharp.fluid} title="Un titre">
          Lorem ipsum dolorem.
        </Tile>
        <Tile fluidImg={data.image.childImageSharp.fluid} title="Un titre">
          Lorem ipsum dolorem.
        </Tile>
        <Tile fluidImg={data.image.childImageSharp.fluid} title="Un titre">
          Lorem ipsum dolorem.
        </Tile>
        <h3>Jeunesse</h3>
        <Tile fluidImg={data.image.childImageSharp.fluid} title="Un titre">
          Lorem ipsum dolorem.
        </Tile>
        <Tile fluidImg={data.image.childImageSharp.fluid} title="Un titre">
          Lorem ipsum dolorem.
        </Tile>
        <Tile fluidImg={data.image.childImageSharp.fluid} title="Un titre">
          Lorem ipsum dolorem.
        </Tile>
        <h3>Adultes</h3>
        <Tile fluidImg={data.image.childImageSharp.fluid} title="Un titre">
          Lorem ipsum dolorem.
        </Tile>
        <Tile fluidImg={data.image.childImageSharp.fluid} title="Un titre">
          Lorem ipsum dolorem.
        </Tile>
        <h3>Seniors</h3>
        <Tile fluidImg={data.image.childImageSharp.fluid} title="Un titre">
          Lorem ipsum dolorem.
        </Tile>
      </div>
    </div>
  )
}

export default List