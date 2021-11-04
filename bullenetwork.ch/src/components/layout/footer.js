import React from "react"
import Img from "gatsby-image"
import { StaticQuery, graphql } from "gatsby"

export default () => {
  return (
    <section id="footer">
      <div className="ribbon"></div>
      <div className="section-container">
        <div class="first-part">
          <div class="left">
            <p>© Association Eglise évangélique de Bulle</p>
            <p>Route du Verdel 8, 1630 Bulle</p>
            <p>Contact: david.hausmann@bullenetwork.ch</p>
          </div>
          <div class="right">
            <a href="https://github.com/doxa-tech/bullenetwork-constellation" target="_blank">
              <ConstellationLogo />
            </a>
          </div>
        </div>
        <div className="sub-apps">
          {app}
          {partitions}
        </div>
      </div>
    </section>
  )
}

const app = (
  <a href="/ficus">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
      width="35px" height="35px" viewBox="0 0 35 35">
      <g>
        <path d="M25.302,0H9.698c-1.3,0-2.364,1.063-2.364,2.364v30.271C7.334,33.936,8.398,35,9.698,35h15.604
		c1.3,0,2.364-1.062,2.364-2.364V2.364C27.666,1.063,26.602,0,25.302,0z M15.004,1.704h4.992c0.158,0,0.286,0.128,0.286,0.287
		c0,0.158-0.128,0.286-0.286,0.286h-4.992c-0.158,0-0.286-0.128-0.286-0.286C14.718,1.832,14.846,1.704,15.004,1.704z M17.5,33.818
		c-0.653,0-1.182-0.529-1.182-1.183s0.529-1.182,1.182-1.182s1.182,0.528,1.182,1.182S18.153,33.818,17.5,33.818z M26.021,30.625
		H8.979V3.749h17.042V30.625z"/>
      </g>
    </svg>
    Application Ficus
  </a>
)

const partitions = (
  <a href="/partitions">
    <svg style={{ fillRule: "evenodd", clipRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: 2 }} width="35px" height="35px" viewBox="0 0 778 1034" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g transform="matrix(0.562686,0,0,0.562686,-1069.91,-868.599)">
        <path d="M2365.75,2499.93C2367.31,2495.55 2370.94,2491.99 2375.77,2490.72L2665.37,2414.38C2673.15,2412.33 2681.14,2416.98 2683.19,2424.76C2683.7,2426.72 2683.8,2428.7 2683.52,2430.58L2683.52,2928.53C2683.52,2970.37 2571.12,3023.2 2544.39,2982.34C2522.9,2949.48 2577.78,2850.95 2648.42,2829.49L2648.42,2470.66L2402.07,2539.39L2402.07,2992.53C2402.07,3034.37 2281.52,3087.2 2254.79,3046.34C2233.3,3013.48 2294.41,2914.95 2365.05,2893.49L2365.05,2506.91C2364.85,2505.49 2364.85,2504.08 2365.05,2502.72L2365.05,2499.93L2365.75,2499.93Z" />
      </g>
      <g transform="matrix(1,0,0,1,-2148.79,-2180.27)">
        <path d="M2240.21,2267.52L2163.37,2267.52C2155.32,2267.52 2148.79,2274.05 2148.79,2282.11L2148.79,3198.95C2148.79,3207.01 2155.32,3213.54 2163.37,3213.54L2820.24,3213.54C2828.3,3213.54 2834.82,3207.01 2834.82,3198.95L2834.82,3126.29L2911.66,3126.29C2919.71,3126.29 2926.24,3119.76 2926.24,3111.7L2926.24,2194.86C2926.24,2186.8 2919.71,2180.27 2911.66,2180.27L2254.79,2180.27C2246.74,2180.27 2240.21,2186.8 2240.21,2194.86L2240.21,2267.52ZM2789.91,2307.85L2789.91,3174.89C2789.91,3174.89 2206.45,3174.89 2206.45,3174.89C2206.45,3174.89 2206.45,2307.85 2206.45,2307.85C2206.45,2307.85 2789.91,2307.85 2789.91,2307.85ZM2298.57,2267.52L2820.24,2267.52C2828.3,2267.52 2834.82,2274.05 2834.82,2282.11L2834.82,3090.04L2888.49,3090.04C2888.49,3090.04 2888.49,2222.02 2888.49,2222.02C2888.49,2222.02 2298.57,2222.02 2298.57,2222.02L2298.57,2267.52Z" style={{ fill: "rgb(35,31,32)" }} />
      </g>
      <g transform="matrix(1.11518,0,0,1.637,-2408.48,-3709.85)">
        <rect x="2254.79" y="2401.22" width="148.068" height="17.477" />
      </g>
      <g transform="matrix(0.557588,0,0,1.637,-951.076,-3709.85)">
        <rect x="2254.79" y="2401.22" width="148.068" height="17.477" />
      </g>
      <g transform="matrix(0.786698,0,0,1.637,-1367.59,-3709.85)">
        <rect x="2254.79" y="2401.22" width="148.068" height="17.477" />
      </g>
      <g transform="matrix(1.35184,0,0,1.637,-2942.11,-3645.06)">
        <rect x="2254.79" y="2401.22" width="148.068" height="17.477" />
      </g>
      <g transform="matrix(0.511527,0,0,1.637,-805.938,-3645.06)">
        <rect x="2254.79" y="2401.22" width="148.068" height="17.477" />
      </g>
      <g transform="matrix(0.220766,0,0,1.637,-47.6203,-3645.06)">
        <rect x="2254.79" y="2401.22" width="148.068" height="17.477" />
      </g>
    </svg>
    Partitions
  </a >
)

const ConstellationLogo = () => (
  <StaticQuery
    query={graphql`
      query constellationquery {
        file(relativePath: { eq: "footer/constellation.png" }) {
          childImageSharp {
            fluid(maxWidth: 120) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => (
      <Img className="constellation" fluid={data.file.childImageSharp.fluid} />
    )}
  />
)