import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = ({ data }) => {

	const [content, setContent] = useState(0)
	const [imageURL, setImageURL] = useState(1)
	useEffect(() => {
		fetch(`https://panda.bullenetwork.ch/directus/items/o2viechatelch_pages/2`)
			.then(response => response.json())
			.then(resultData => {
				setContent(resultData.data)
				fetch(`https://panda.bullenetwork.ch/directus/files/${resultData.data.image}`)
					.then(response => response.json())
					.then(resultData => {
						setImageURL(resultData.data.data.full_url)
					})
			})
	})

	return (
		<Layout className="page">
			<SEO
				title={content.title}
				description={content.subtitle}
			/>
			<div className="wrapper">
				<h1>{content.title}</h1>
				<article dangerouslySetInnerHTML={{ __html: content.content }} />
			</div>
		</Layout>
	)
}

export default AboutPage