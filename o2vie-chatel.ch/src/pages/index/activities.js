import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const IndexActivities = () => {
  const data = useStaticQuery(graphql`
  query {
    directus {
      o2vie_activities {
        id
        subtitle
        title
        image {
          id
          imageFile {
            childImageSharp {
              gatsbyImageData(aspectRatio: 1.7, layout: FULL_WIDTH)
            }
          }
        }
      }
    }
  }
`)

  return (
    <div id="features-wrapper" >
      <div className="container">
        <div className="row">

          {data.directus.o2vie_activities.map((a) => (
            <ActivityPreview key={a.id.toString()} activity={a} />
          ))
          }


        </div>
      </div>
    </div >
  )
}

const ActivityPreview = ({ activity }) => {
  const image = getImage(activity.image.imageFile)

  return (
    <div className="col-4 col-12-medium">

      <section className="box feature">
        <a href={`/activities#act-${activity.id}`} className="image featured"><GatsbyImage image={image} alt={activity.id} /></a>
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