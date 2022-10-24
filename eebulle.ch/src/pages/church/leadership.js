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
        <p className="intro">Dans l'ADN des églises évangéliques apostoliques (<a href="https://www.mouvementplus.ch/" target="_blank">mouvementplus.ch</a>) se trouve une forte notion de travail d'équipe, d'interdépendance ministérielle, un leadership collégial, la pluralité des dons et charismes au service du Corps de Christ. C'est pourquoi, nous avons une base de 3 équipes dirigeantes qui forment ensemble le leadership de l'église évangélique de Bulle. Les leaders de l’EEBulle sont subordonnés à l’équipe de ministères du <a href="https://bullenetwork.ch" target="_blank">Bullenetwork</a>.</p>
        <p className="highlight">
          "Pas une question de valeur, mais de sphère d'influence selon l'appel de Dieu"
        </p>
        <Tile fluidImg={data.ministries.childImageSharp.fluid} title="Ministère">
          L'équipe de ministères est composée des responsables régionaux et des ministères.<br />
          Découvre l'équipe sur <a href="https://bullenetwork.ch" target="_blank" rel="noreferrer">le site du Bullenetwork</a>
        </Tile>
        <Tile fluidImg={data.pastoral.childImageSharp.fluid} title="Conseil pastoral">
          Le conseil pastoral est constitué des responsables spirituels de l’église locale, idéalement au moins quatre couples. Ses membres sont appelés «anciens». Il est présidé par le pasteur principal. Le rôle de ce Conseil est la direction spirituelle et globale de l’église locale.
        </Tile>
        <Tile fluidImg={data.sectors.childImageSharp.fluid} title="Conseil opérationnel">
          C’est une équipe constituée des responsables des différents secteurs d’activité (Hospitalité, finances, technique, etc.). Ses membres sont appelés diacres. Le rôle de ce Conseil est de gérer l’aspect organisationnel de l’église locale.
        </Tile>
      </div>
    </div>
  )
}

export default Leadership