module.exports = {
  siteMetadata: {
    title: `O2Vie`,
    description: `O2Vie website`,
    author: `Doxatech`,
    siteUrl: `https://o2vie-chatel.ch`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,

    // ... some gatsby plugins

    // You can take advantage of the following plugins with gatsby-source-directus

    // `gatsby-plugin-image`,
    // `gatsby-transformer-sharp`,
    // `gatsby-plugin-sharp`,

    // Finally our plugin
    {
      resolve: '@directus/gatsby-source-directus',
      options: {
        url: `https://truite.bullenetwork.ch`, // Fill with your Directus instance address
      },
    },
  ],
}
