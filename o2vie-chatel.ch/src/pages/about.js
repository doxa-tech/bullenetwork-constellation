import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const AboutPage = () => (
  <Layout>
    <Seo title="A propos" />

    <div id="main-wrapper">
      <div class="container">
        <div id="content">

          <article>

            <h2>À propos</h2>

            <p>
              O2Vie est une association chrétienne dont le but est de servir sa ville, Châtel-St-Denis, tout en vivant la foi. Nous sommes une équipe de jeunes chrétiens qui souhaite vivre l'église en dehors de ses murs. Notre slogan, Génération d'énergie, signifie que nous sommes une génération capable de se lever et de donner de nouvelles impulsions autour de nous. Notre travail vise à rencontrer et aider les gens là où ils se trouvent.
            </p>

            <h3>Mission</h3>

            <p>
              Témoigner de la vie abondante de Jésus et être une église accessible au service de la région de la Veveyse.
            </p>

            <h3>Historique</h3>

            <p>
              L’église O2Vie à Châtel-Saint-Denis est née du réseau d’églises « Bulle Network ». Ses premières activités ont démarré en 2019, avec l’organisation de soirées de jeux de société dans un bar et des MeetUp (forme de débats) dans un restaurant de la ville. L’église vit ses premières célébrations en septembre 2021.
            </p>

          </article>

        </div>
      </div>
    </div>
  </Layout>
)

export default AboutPage
