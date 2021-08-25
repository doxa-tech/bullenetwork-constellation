import React from "react"
import { Link } from "gatsby"
import {RiArrowLeftSLine, RiBugLine, RiSkullLine} from "react-icons/ri"

import SEO from "../components/seo"
import Layout from "../components/layout"

const NotFound = () => (
  <Layout className="not-found-page">
    <SEO title="Page inexistante"/>
    <div className="wrapper" style={{
      textAlign: "center"
    }}>
      <header>
        <RiSkullLine style={{
          fontSize: "128px",
          color: "var(--primary-color)"
        }}/>
        <h1>Oops on ne s'attendait pas à ça !</h1>
        <p>Cette page n'existe malheureusement pas.</p>
      </header>
      <Link to="/" className="button"><RiArrowLeftSLine className="icon -left"/>Retour à l'accueil</Link>
      <Link to="/contact" className="button -outline">Envoyer un message <RiBugLine className="icon -right"/></Link>
    </div>
  </Layout>
)

export default NotFound