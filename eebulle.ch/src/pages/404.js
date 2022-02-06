import React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import "./404.scss"

const NotFoundPage = () => (
  <Layout layoutClass="error-404">
    <Seo title="404: Not found" />
    <div className="container">
      <h1>PAGE INTROUVABLE</h1>
      <p>La page recherchée n'existe pas. (erreur 404)</p>
    </div>
  </Layout>
)

export default NotFoundPage
