import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Activity from "./activity"

import "./activities.scss"

const Activities = () => {

  const [content, setContent] = useState(0)
  useEffect(() => {
    setContent(
      <div className="loadrr"><div><div></div><div></div><div></div><div></div></div></div>
    )
    fetch(`https://panda.bullenetwork.ch/directus/items/eebulle_home_activities`)
      .then(response => response.json())
      .then(resultData => {
        var activities = resultData.data
        activities.sort(function (a, b) {
          return a.order - b.order;
        });
        const result = activities.map((activity) =>
          <Activity imageID={activity.image} title={activity.title} description={activity.content} />
        );
        setContent(result)
      })
  }, [])

  return (
    <div className="activities">
      <div className="container">
        <div className="left">
          {content[0]}
          {content[2]}
        </div>
        <div className="right">
          <h2>Nos activités</h2>
          {content[1]}
          {content[3]}
        </div>
      </div>
    </div>
  )
}

export default Activities
