/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
var path = require('path');

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  /* Your site config here */
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        // This type will contain remote schema Query type
        typeName: "TRUITE",
        // This is the field under which it's accessible
        fieldName: "truite",
        // URL to query from
        url: process.env.PARTITIONS_ENDPOINT,
        // 
        headers: {
          Authorization: `Bearer ${process.env.PARTITIONS_GRAPHQL_TOKEN}`,
        },
      },
    },
  ],
}