import * as React from "react"

import "./welcome.css"

const IndexWelcome = () => (
  <div id="main-wrapper">
    <div class="container">
      <div class="row gtr-200">
        <div class="col-8 col-12-medium imp-medium">

          <div id="content">
            <section class="last">
              <h2>Qui sommes-nous ?</h2>
              <p>
              Découvrez les activités d'O2Vie à Châtel-St-Denis, une association chrétienne qui s'investit pour la ville en proposant diverses actions pour ses habitants.
              Actuellement, l'association O2Vie organise une soirée jeux par mois et notre église se réunit plusieurs fois par mois pour une célébration le dimanche matin.
              </p>
              <a href="#" class="button icon solid fa-arrow-circle-right">En savoir plus</a>
            </section>
          </div>

        </div>
        <div class="col-4 col-12-medium imp-medium">
          <div id="sidebar">
            <section class="widget thumbnails">
              <h3>Prochainement</h3>
              
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default IndexWelcome
