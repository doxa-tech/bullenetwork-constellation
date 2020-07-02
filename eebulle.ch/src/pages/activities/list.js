import React, { useState, useEffect } from "react"

import Activity from "./activity"

import "./list.scss"



const List = () => {

  const [content, setContent] = useState(0)
  useEffect(() => {
    setContent([
      [<div className="loadrr"><div><div></div><div></div><div></div><div></div></div></div>],
      [<div className="loadrr"><div><div></div><div></div><div></div><div></div></div></div>],
      [<div className="loadrr"><div><div></div><div></div><div></div><div></div></div></div>],
      [<div className="loadrr"><div><div></div><div></div><div></div><div></div></div></div>]
    ]
    )
    fetch(`https://panda.bullenetwork.ch/directus/items/eebulle_activities`)
      .then(response => response.json())
      .then(resultData => {
        var activities = resultData.data
        activities.sort(function (a, b) {
          return a.order - b.order;
        });

        var result = [[], [], [], []]

        // 1 = Activity for all
        // 2 = youth
        // 3 = adult
        // 4 = senior
        activities.forEach((activity) => {
          var el = <Activity imageID={activity.image} title={activity.title} description={activity.content} />
          if (activity.category === 1) {
            result[0].push(el)
          } else if (activity.category === 2) {
            result[1].push(el)
          } else if (activity.category === 3) {
            result[2].push(el)
          } else if (activity.category === 4) {
            result[3].push(el)
          }
        });

        setContent(result)
      })
  }, [])

  return (
    <div className="list">
      <div className="container">
        <h2>Nos activités</h2>
        <h3>Pour tous</h3>
        {content[0]}
        <h3>Pour les jeunes</h3>
        {content[1]}
        <h3>Pour adultes</h3>
        {content[2]}
        <h3>Pour les séniores</h3>
        {content[3]}
      </div>
    </div>
  )
}

export default List