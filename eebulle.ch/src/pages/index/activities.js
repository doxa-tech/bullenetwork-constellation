import React from "react"
import Activity from "./activity"

import "./activities.scss"

const Activities = () => (
  <div className="activities">
    <div className="container">
      <div className="left">
        <Activity path="activities/1.jpg" title="title" description="description" />
      </div>
      <div className="right">
        <h2>Activités</h2>
      </div>
    </div>
  </div>
)

export default Activities
