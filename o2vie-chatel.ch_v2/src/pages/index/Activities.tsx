import * as React from "react"
import { useState } from "react"
import { useEffect } from "react"
import ProgressiveImg from "../../components/ProgressiveImg"

const IndexActivities = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.PUBLIC_DIRECTUS_ENDPOINT}/items/o2vie_activities`)
      .then(response => response.json())
      .then(resultData => {
        setActivities(resultData.data)
      })
  }, [])

  return (
    <div id="features-wrapper" >
      <div className="container">
        <div className="row">

          {activities.map((activity) => (
            <ActivityPreview key={activity.id.toString()} activity={activity} />
          ))
          }

        </div>
      </div>
    </div >
  )
}

const ActivityPreview = ({ activity }) => {

  return (
    <div className="col-4 col-12-medium">

      <section className="box feature">
        <a href={`/activities#act-${activity.id}`} className="image featured">
          <ProgressiveImg
            src={`${import.meta.env.PUBLIC_DIRECTUS_ENDPOINT}/assets/${activity.image}`}
            placeholderSrc={`${import.meta.env.PUBLIC_DIRECTUS_ENDPOINT}/assets/${activity.image}?key=lowqual`}
          />
        </a>
        <div className="inner">
          <header>
            <h2>{activity.title}</h2>
            <p>{activity.subtitle}</p>
          </header>
        </div>
      </section>

    </div>
  )
}

export default IndexActivities