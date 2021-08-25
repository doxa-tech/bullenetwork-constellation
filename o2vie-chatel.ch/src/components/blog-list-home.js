import React, { useState, useEffect } from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import { RiArrowDownLine, RiArrowRightSLine } from "react-icons/ri"

import PostCard from "./post-card"

const PostMaker = ({ data }) => (
  <section className="home-posts">
    <h2>Découvre nos <strong>Activités</strong> <span class="icon -right"><RiArrowDownLine /></span></h2>
    <div className="grids col-1 sm-2 lg-3">
      {data}
    </div>
    <Link className="button" to="/activities">Tout voir<span class="icon -right"><RiArrowRightSLine /></span></Link>
  </section>
)

export default function BlogListHome() {
  const [content, setContent] = useState(0)
  useEffect(() => {
    setContent(
      <div className="loadrr"><div><div></div><div></div><div></div><div></div></div></div>
    )
    fetch(`https://panda.bullenetwork.ch/directus/items/o2viechatelch`)
      .then(response => response.json())
      .then(resultData => {
        const result = resultData.data.map((event) =>
          <PostCard data={event} />
        );
        setContent(result)
      })
  }, [])

  return (
    <PostMaker data={content} />
  )
}