import * as React from "react"
import Layout from "../components/layout"

import Seo from "../components/seo"
import Activity from "../components/activity"
import { useState, useEffect } from "react"

const ActivitiesPage = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch(`${process.env.GATSBY_DIRECTUS_ENDPOINT}/graphql`, {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(activitiesQuery)
    }).then((req) => {
      return req.json();
    }).then((response) => {
      if (response.errors) {
        alert("Error:" + JSON.stringify(response.errors))
      } else {
        setActivities(response.data.o2vie_activities)
      }
    })
  }, [])

  return (
    <Layout>
      <Seo title="Activités" />

      <div id="main-wrapper" className="activities">
        <div className="container">
          <div id="content">
            <h2>Nos activités</h2>
            <h4>Découvre nos activités à Châtel et dans la région.</h4>
          </div>
        </div>
      </div>

      <div id="features-wrapper">
        <div className="container">
          <div className="row">

            {activities.map((a) => (
              <Activity key={a.id.toString()} activity={a} />
            ))
            }

          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ActivitiesPage

const activitiesQuery = {
  "query": `query {
      o2vie_activities(sort: ["sort"]) {
        id
        body
        subtitle
        title
        image {
          id
        }
      }
    }`
}