import React from "react"
import { Link } from "gatsby"
import {RiArrowLeftSLine, RiCheckboxCircleLine} from "react-icons/ri"

import SEO from "../components/seo"
import Layout from "../components/layout"

const Thanks = () => (
  <Layout className="thanks-page">
    <SEO title="Merci"/>
    <div className="wrapper" style={{
      textAlign: "center"
    }}>
      <RiCheckboxCircleLine style={{
        fontSize: "128px",
        color: "var(--primary-color)"
      }}/>
      <h1>On a bien reçu ton message !</h1>
      <p>Merci d'avoir pris contact avec nous. On te repondra dans les plus brefs délais.</p>
      <Link to="/" className="button"><RiArrowLeftSLine className="icon -left"/>Retour à l'accueil</Link>
    </div>

  </Layout>
)

export default Thanks