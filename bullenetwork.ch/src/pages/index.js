import React from "react"
import Intro from "../components/intro"
import Layout from "../components/layout"
import Church from "./index/church"

export default () => (
  <Layout layoutClass="index-container">
    <Intro>
      Le Bulle Network est le réseau d'églises né de l'église évangélique de Bulle
    </Intro>

    <section id="text-info">

      <div className="section-container" style={{ border: "2px solid red", padding: "30px" }}>

        <h2>⚠️ INFO CORONAVIRUS 🦠</h2>

        <p>
          Notre principe reste celui de suivre les recommandations communiquées via le Réseau Evangélique Suisse. En
          effet, le RES suit très bien les affaires jour après jour et transmets ses recommandations sur son site web:
          https://evangelique.ch/coronavirus/ Selon les limites à ce jour, nous pouvons maintenir nos célébrations sans
          démarches particulières avec les autorités cantonales, car à Bulle, nous n'excédons pas 150 personnes au culte.
        </p>

        <h3>Participation</h3>
        <p>
          Nous conseillons aux personnes particulièrement vulnérables, c’est-à-dire les personnes
          de plus de 65 ans et celles souffrant de l’hypertension artérielle, du diabète, de maladies cardiovasculaires,
          de maladies respiratoires chroniques, de maladies et de thérapies qui affaiblissent le système immunitaire ou du
          cancer, de rester à la maison. De plus, les personnes présentant des symptômes de grippe (fièvre, toux) doivent
          être priées de ne pas assister à l’événement ou renvoyées chez elles.
        </p>

        <h3>Contacts interpersonnels</h3>
        <p>
          Nous recommandons de garder une certaine distance par rapport aux autres
          personnes, en
          particulier celles qui sont
          particulièrement exposées. En ce sens, il convient d’utiliser une pièce plus grande si possible. Tout rituel de
          bienvenue (par exemple, serrer la main) doit être évité.
        </p>

        <h3>Mesures générales de protection</h3>
        <p>
          Les mains doivent être lavées fréquemment et soigneusement. En outre,
          il est recommandé de tousser ou d’éternuer dans le creux du coude ou dans un mouchoir ; ce dernier doit ensuite
          être jeté dans une poubelle fermée.
        </p>
      </div>

    </section>

    <section id="churches">
      <div className="section-container">
        <ul className="ch-grid">
          <Church
            website="https://eebulle.ch"
            churchName="Eglise évanélique de Bulle"
            churchAddress="1630 Bulle"
            churchColor="#E84C09"
            imageName="EEBulle-w.png"
          />
          <Church
            website="https://www.eglisesurleroc.ch"
            churchName="Église sur le roc Fribourg"
            churchAddress="1700 Fribourg"
            churchColor="#64AFE1"
            imageName="ERocFribourg-w.png"
          />
          <Church
            website="https://eeromont.ch"
            churchName="Église évangélique de Romont"
            churchAddress="1680 Romont"
            churchColor="#39A645"
            imageName="EERomont-w.png"
          />
          <Church
            website="https://enhaut.eebulle.ch"
            churchName="Le refuge église d'EnHaut"
            churchAddress="1618 Châtel-St-Denis"
            churchColor="#FAA519"
            imageName="Enhaut-w.png"
          />
          <Church
            website="https://www.impact-stecroix.ch"
            churchName="IMPACT Ste-Croix"
            churchAddress="11450 Ste-Croix"
            churchColor="#3c83aa"
            imageName="IStecroix.png"
          />
        </ul>
      </div>
    </section>

    <section id="text-info">
      <div className="section-container">
        <h2>Notre mission</h2>
        <p>
          Manifester la puissance libératrice de Jésus-Christ et faire croître
          son Royaume jusqu’aux extrémités de la terre.
        </p>

        <h2>Nos valeurs</h2>
        <p>
          + Encourager
          <br />
          + Équiper
          <br />+ Multiplier
        </p>

        <h2>Charte PDF</h2>
        <p>
          <a href="CharteBN.pdf">Télécharger la charte</a>
        </p>

        <h2>Présentation</h2>
        <p>
          Le Bulle Network est le réseau d’églises de l’église évangélique de
          Bulle. Ce réseau est constitué des églises naissantes directement
          implantées par l’EEBulle (actuellement Fribourg, Romont, Rougemont,
          Morges, Sainte-Croix).
          <br />
          Le Bulle Network fonctionne avec une équipe de ministères.
          Juridiquement, le réseau fait partie de l’association de l’église
          évangélique de Bulle.
          <br />
          L’EEBulle étant membre des EEAR (églises évangéliques apostoliques
          romandes) et du RES (réseau évangélique suisse), le Bulle Network
          l’est aussi de fait.
          <br />
        </p>

        <h3>Historique</h3>
        <p>
          L’EEBulle a été fondée par le pasteur Michel Renevier il y a plus de
          30 ans en Gruyère. L’esprit pionnier et de foi du fondateur a soutenu
          la croissance de l’église locale tout au long de son parcours.
          Cependant, l’EEBulle a vécu les hauts et les bas que toute église
          locale connaît dans son histoire.
          <br />A son arrivée en janvier 2013, le pasteur David Hausmann a
          rapidement eu la vision que Dieu souhaitait élargir l’œuvre par
          l’implantation de nouvelles églises. Cette nouvelle orientation
          stratégique a été validée par le leadership de Bulle et est maintenant
          en bonne phase de réalisation au niveau régional.
        </p>

        <h3>Vision</h3>
        <p>
          Nous sommes un réseau, dirigé par l’équipe de ministères de l’EEBulle,
          qui implante des églises en Suisse et en Europe par l’évangélisation
          et la multiplication des leaders.
          <br />
          Nous recrutons, formons et établissons des leaders d’églises pionniers
          au sein de nos implantations. Nous avons la conviction que les
          ressources humaines, dans la puissance du Saint Esprit, sont la clef
          de succès pour la croissance de l’église locale.
        </p>

        <h3>Besoins</h3>
        <p>
          Au regard de notre vision et de la réalité du terrain actuelle, nos
          besoins s’articulent autour du financement de nos ministères et de nos
          ministères en formation, impliqués dans nos implantations d’églises.
          En effet, la stratégie de développement par l’implantation d’églises a
          un coût élevé en terme RH et logistique. A elle seule, l’EEBulle ne
          peut pas soutenir tous ces projets que Dieu a ouverts en Romandie.
          Nous travaillons aujourd’hui à la recherche de fonds prioritairement
          en faveur des ministères du Bulle Network.
        </p>
      </div>
    </section>
  </Layout>
)
