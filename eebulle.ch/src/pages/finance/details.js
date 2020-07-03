import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import "./details.scss"

const Details = () => {
  const img = useStaticQuery(graphql`
    query {
      twint: file(relativePath: { eq: "finance/twint.jpg" }) {
        childImageSharp {
          fixed(width: 250) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <div className="details">
      <div className="container">

        <h3>Pourquoi ?</h3>
        
        <p>
          Nous apprécions particulièrement votre soutien financier pour l'évangile et le ministère de l'église évangélique de Bulle. Nous sommes très reconnaissants pour les ressources que Dieu met à notre disposition au travers de personnes qui sont aussi nos partenaires de service à la suite de Jésus-Christ.  
          Nous sommes une association cultuelle qui ne bénéficie d'aucun subside de l'Etat et qui fonctionne ainsi uniquement grâce à la générosité de ses membres et amis. Actuellement, nous employons 2 personnes : 1 pasteur à 60% et 1 apprenti pasteur à 50%. Nous sommes locataires des locaux dont nous bénéficions à la route du Verdel 8 à Bulle.  
          Théologiquement, nous enseignons à nos membres que la dîme est un principe biblique de bon sens, sans être cependant une loi ou une quelconque contrainte. Dieu aime que celui qui donne le fasse avec joie et dans une totale liberté (2 Cor. 9:7).  
          Pour œuvrer à notre mission, le budget annuel 2018 s'élève à CHF 195'000.-  et par conséquent, nos besoins en dons sont d'environ CHF 16'250.- par mois.
        </p>
        
        <h3>Comment ?</h3>

        <p>
          Vous pouvez participer au financement de nos activités via 3 moyens :
          <ul>
            <li>Par Twint (ci-dessous)</li>
            <li>Par versement/virement sur notre compte postal : <br />IBAN CH50 0900 0000 1755 9407 8 (Eglise Evangélique de Bulle, Route du Verdel 8, 1630 Bulle)</li>
            <li>En cash lors de nos célébrations hebdomadaires dans les paniers des collectes</li>
          </ul>
        </p>

        <Img fixed={img.twint.childImageSharp.fixed} style={{ display: `block`, margin: `0 auto` }} />

        <h3>A savoir</h3>
      
        <p>
          Lors de nos 3 soirées V.I.P. annuelles, qui sont des rencontres publiques ouvertes à tous, le leadership de notre église présente notamment nos comptes et finances en toute transparence. 
        </p>
      </div>
    </div>
  )
}

export default Details