import React from "react"
import ProgressiveImg from "./progressiveImg"

const Activity = ({ activity }) => {

  return (
    <div className="col-6 col-12-medium">

      <section className="box feature" id={`act-${activity.id}`}>
        <a href={`/activities#act-${activity.id}`} className="image featured">
          <ProgressiveImg
            src={`${process.env.GATSBY_DIRECTUS_ENDPOINT}/assets/${activity.image.id}`}
            placeholderSrc={`${process.env.GATSBY_DIRECTUS_ENDPOINT}/assets/${activity.image.id}?key=lowqual`}
          />
        </a>
        <div className="inner">
          <header>
            <h2>{activity.title}</h2>
            <p>{activity.subtitle}</p>
          </header>
          <div dangerouslySetInnerHTML={{ __html: activity.body }}></div>
        </div>
      </section>

    </div>
  )
}

export default Activity