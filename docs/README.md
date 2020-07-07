# RamJam

<div align="center">
  <img src="assets/BN-constellation.png"/>
</div>

# Context

Needs:

- Deploy multiple "small" websites
- Allow websites to have some dynamic content
- Provide to non-technical users the ability to update the dynamic
  content
- Reduce to its minimum the maintenance cost of the system

# The stack

- Deploy a single headless CMS, ie. a website that offers a user-friendly
interface to CRUD the data and an API to programatically fetch them
- generate as many static websites as needed and use the API to get the dynamic data

As the headless CMS we go with [Directus](https://directus.io).

To generate the static website we go with [Gatsby](https://www.gatsbyjs.org).

# Deploy a Directus instance

See [/directus](/directus)

# Generate a static website

```js
# pages/a-gatsby-page.js
import React, { useState, useEffect } from "react"
import Layout from "../components/layout"

export default ({ data }) => {

  const [title, setTitle] = useState(0)
  const [content, setContent] = useState(1)
  useEffect(() => {
    fetch(`http://0.0.0.0:8080/Directus/items/bullenetworkpages/1`)
      .then(response => response.json())
      .then(resultData => {
        setTitle(resultData.data.title)
        setContent(resultData.data.content)
      })
  }, [])

  return (
    <Layout>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{__html: content}} />
    </Layout>
  )
}
```