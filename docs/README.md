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

# Create a new site

```bash
$ sudo mkdir -p /var/www/example.com/public_html
$ sudo chown -R $USER:$USER /var/www/example.com/public_html/
```

# Continuous Deployement

## Generate a keypair

Generate a keypair

```bash
ssh-keygen -t rsa -b 4096 -C "eebulle-ch-github-rsync"
```

Add the private key as a secret from the repository setting with the DEPLOY_KEY
name (*Repository* > Settings > Secrets > New secret).

## Write the action

Write the action that triggers an `rsync` upon changes on the production branch.
See `.github/workflows/deploy.yml`.

## Configure the server

Authorize the key on the server side to only execute rsync. Add in the
`~/.ssh/authorized_keys`:

```bash
command="rsync --server -vlogDtprc --delete . /var/www/wookiee.ch/public_html/columbus" ssh-rsa PUBLIC_SSH_KEY
```

## Deploy

To make a deployment on the production server, update the production branch from
master with `git push origin master:production`.

This process is semi-automatic, as we know it's hard to maintain a 100% safe
master branch and it gives us more control on the deployment.