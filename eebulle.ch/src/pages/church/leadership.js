import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Tile } from "../../components/tile"

import "./leadership.scss"

export const leadershipPhotos = graphql`
  fragment leadershipPhotos on File {
    childImageSharp {
      fluid(maxWidth: 300) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`

const Leadership = () => {
  const data = useStaticQuery(graphql`
    query {
      ministries: file(relativePath: { eq: "church/CM.jpg" }) {
        ...leadershipPhotos
      }
      pastoral: file(relativePath: { eq: "church/CP.jpg" }) {
        ...leadershipPhotos
      }
      sectors: file(relativePath: { eq: "church/CE.jpg" }) {
        ...leadershipPhotos
      }
    }
  `)

  return (
    <div className="leadership">
      <div className="container">
        <h2>Leadership</h2>
        <p className="intro">Dans l'ADN des églises évangéliques apostoliques (www.eear.ch) se trouve une forte notion de travail d'équipe, d'interdépendance ministérielle, un leadership collégial, la pluralité des dons et charismes au service du Corps de Christ. C'est pourquoi, nous avons une base de 3 équipes dirigeantes qui forment ensemble le leadership de l'église évangélique de Bulle.</p>
        <p className="highlight">
          "Pas une question de valeur, mais de sphère d'influence selon l'appel de Dieu"
        </p>
        <Tile fluidImg={data.ministries.childImageSharp.fluid} title="Ministère">
          L'équipe de ministères est composée des responsables régionaux et des ministères.<br />
          Découvre l'équipe sur <a href="https://bullenetwork.ch" target="_blank" rel="noreferrer">le site du Bullenetwork</a>
        </Tile>
        <Tile fluidImg={data.pastoral.childImageSharp.fluid} title="Conseil pastoral">
          Le conseil pastoral est composé des responsables locaux. Ce sont les anciens de l'église.<br />
          Ce conseil est constitué de: André & Isabelle Künzler, Sévin & Hélène Kocher, Roland & Maude Friedli, Stéphane et Anita Blanchard
        </Tile>
        <Tile fluidImg={data.sectors.childImageSharp.fluid} title="Conseil d'église">
          Le conseil d'église est composé des responsables de secteurs opérationnels. Ce sont les diacres de l'église.<br />
          Ce conseil est constitué de: Keran Kocher (président), Noémien Kocher (communication), Mathieu Meyer (logistique), Elie Hausmann (Waykup), Jocelyne Mercier (intercession)
        </Tile>
      </div>
    </div>
  )
}

export default Leadership