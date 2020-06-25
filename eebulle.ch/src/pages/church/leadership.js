import React from "react"
import { useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import Tile from "../../components/tile"

import "./leadership.scss"

const Leadership = () => {
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
    <div className="leadership">
      <div className="container">
        <h2>Leadership</h2>
        <p>Dans l'ADN des églises évangéliques apostoliques (www.eear.ch) se trouve une forte notion de travail d'équipe, d'interdépendance ministérielle, un leadership collégial, la pluralité des dons et charismes au service du Corps de Christ. C'est pourquoi, nous avons une base de 3 équipes dirigeantes qui forment ensemble le leadership de l'église évangélique de Bulle.</p>
        <p className="highlight">
          "Pas une question de valeur, mais de sphère d'influence selon l'appel de Dieu"
        </p>
        <Tile fluidImg={data.image.childImageSharp.fluid} title="Ministère">
          L'équipe de ministères est composée des responsables régionaux et des ministères.<br/>
          Découvre l'équipe sur <a href="https://bullenetwork.ch" target="_blank">le site du Bullenetwork</a>
        </Tile>
        <Tile fluidImg={data.image.childImageSharp.fluid} title="Conseil pastoral">
          Le conseil pastoral est composé des responsables locaux. Ce sont les anciens de l'église.<br/>
          Ce conseil est constitué de: André & Isabelle Künzler, Sévin & Hélène Kocher, Roland & Maude Friedli, Stéphane et Anita Blanchard, Fannie Blakaj
        </Tile>
        <Tile fluidImg={data.image.childImageSharp.fluid} title="Conseil d'église">
          Le conseil d'église est composé des responsables de secteurs opérationnels. Ce sont les diacres de l'église.<br/>
          Ce conseil est constitué de: Keran Kocher (président), Sévin Kocher(finances), Noémien Kocher (communication), Elisabeth Savary (cafétéria), Mathieu Meyer (responsable logistique), Elie Hausmann (responsable Waykup)
        </Tile>
      </div>
    </div>
  )
}

export default Leadership