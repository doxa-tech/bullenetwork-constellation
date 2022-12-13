import React from "react"

const Activity = ({ activity }) => {

  return (
    <div className="col-6 col-12-medium">

      <section className="box feature" id={`act-${activity.id}`}>
        <a href={`/activities#act-${activity.id}`} className="image featured">
          <img src={`${process.env.GATSBY_DIRECTUS_ENDPOINT}/assets/${activity.image.id}`} />
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