import React from "react"

import "./notice.scss"

const Notice = () => {
  return (
    <div className="notice">
      <div className="container">
        <div>
          <h2>Covid-19</h2>
          <p>Les célébrations ont lieu tous les dimanche (accueil dès 9h30, célébration à 10h) dans nos locaux sur inscription uniquement. Afin de respecter les restrictions sanitaires, la capacité maximum d'accueil est limitée. Merci de suivre ce lien pour vous inscrire avant de venir chaque dimanche (sélectionner une date, puis la quantité dans la colonne "quantité" puis cliquez sur "suite"). Il n'est pas nécessaire d'imprimer et d'apporter son billet:</p>
          <p>Si vous présentez des symptômes, nous vous demandons de rester chez vous. Les célébrations continuent d'être diffusées en ligne sur la page du Bulle Network. Nous recommandons aux personnes qui sont dans un groupe à risque de continuer à suivre les célébrations en ligne.</p>
        </div>
      </div>
    </div>
  )
}

export default Notice