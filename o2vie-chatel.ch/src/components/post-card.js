import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

const PostCard = ({ data }) => {
  const [imageURL, setImageURL] = useState(0)
  useEffect(() => {

    fetch(`https://panda.bullenetwork.ch/directus/files/${data.featuredimage}`)
      .then(response => response.json())
      .then(resultData => {
        setImageURL(resultData.data.data.full_url)
      })
  })

  return (
    <article className="post-card" >

      <Link to={"/activities/" + data.slug}>
        <img src={imageURL} alt="L'événement" />
      </Link>

      < div class="post-content" >
        <h2 className="title"><Link to={"/activities/" + data.slug}>{data.title}</Link></h2>
        {/* <p className="meta"><time>{data.frontmatter.date}</time></p> */}
      </div >
    </article >
  )
}

export default PostCard