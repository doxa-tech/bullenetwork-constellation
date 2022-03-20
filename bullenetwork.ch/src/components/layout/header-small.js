import React from "react"
import * as styles from "./header-small.module.scss"
import { StaticImage } from "gatsby-plugin-image"

export default ({ title }) => (
  <section id="header-section" className={styles.header}>
    <div className={styles.sectionContainer}>
      <div className={styles.subContainer}>
        <div className={styles.left}>
          <a href="/">
            <StaticImage src="../../images/index/bullenetwork.png" alt="team" style={{ margin: 'auto' }} layout="fixed" width={200} />
          </a>
        </div>
        <div className={styles.right}>
          <p>
            {title}
          </p>
        </div>
      </div>
    </div>
  </section>
)


