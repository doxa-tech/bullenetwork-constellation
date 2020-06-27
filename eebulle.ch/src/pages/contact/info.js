import React from "react"

import { IntroLeft } from "../../components/intro"

import "./info.scss"

const Info = () => (
  <div className="info">
    <div className="container">
      <div className="intro">
        <div className="left">
        <IntroLeft>
          <h3>Email</h3>
          <p><a href="mailto:secretariat@bullenetwork.ch">secretariat@bullenetwork.ch</a></p>
        </IntroLeft>
        <IntroLeft>
          <h3>Demande de prière</h3>
          <p>Un formulaire est disponible à <a href="https://bullenetwork.ch/contact" target="_blank" rel="noreferrer">cette adresse</a> pour les demandes de prière</p>
        </IntroLeft>
        </div>
        <div className="right">
          <h3>Église évangélique de Bulle</h3>
          <p>Route du Verdel 8</p>
          <p>1630 Bulle</p>
          <p>Bâtiment Riedo, 1er étage</p>
        </div>
      </div>
      <div className="help">
        <h3>Relation d'aide chrétienne</h3>
        <p>Pour un accompagnement en relation d'aide chrétienne, André et Isabelle Künzler sont à votre service: isabelle.kunzler@bullenetwork.ch</p>
      </div>
    </div>
  </div>
)

export default Info