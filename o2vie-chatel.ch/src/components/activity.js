import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Activity = ({ activity }) => {
  const image = getImage(activity.image.imageFile)

  return (
    <div className="col-6 col-12-medium">

      <section className="box feature" id={`act-${activity.id}`}>
        <a href={`/activities#act-${activity.id}`} className="image featured"><GatsbyImage image={image} alt={activity.id} /></a>
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