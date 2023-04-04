import * as React from "react"

import Activity from "./Activity"
import { useState, useEffect } from "react"

const ActivitiesGrid = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.PUBLIC_DIRECTUS_ENDPOINT}/graphql`, {
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
    <div className="row">
      {activities.map((a) => (
        <Activity key={a.id.toString()} activity={a} />
      ))
      }
    </div>
  )
}

export default ActivitiesGrid

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