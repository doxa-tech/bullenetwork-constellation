import React from "react"

import { IntroLeft, IntroRight } from "../../components/intro"

import "./mission.scss"

const Mission = () => (
  <div className="mission">
    <div className="container">
      <IntroLeft>
        <h2>Notre mission</h2>
        <p>Manifester la puissance libératrice de Jésus-Christ et faire croître Son Royaume au-delà du canton de Fribourg!</p>
      </IntroLeft>
      <IntroRight>
        <h2>Valeurs clés</h2>
        <ul>
          <li>La connexion à Dieu</li>
          <li>La connexion aux autres</li>
          <li>L'encouragement mutuel et collectif</li>
        </ul>
      </IntroRight>
    </div>
  </div>
)

export default Mission