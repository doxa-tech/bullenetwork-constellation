import React from "react"
import * as styles from "./header.module.scss"
import HeaderBG from './header-bg'
import { StaticImage } from "gatsby-plugin-image"

export default () => (
  <section id="header-section" className={styles.header}>
    <HeaderBG>
      <div>
        <div className={styles.sectionContainer}>
          <div className={styles.subContainer}>
            <div className={styles.left}>
              <a href="/">
                <StaticImage src="../../images/index/bullenetwork.png" alt="team" style={{ margin: 'auto' }} layout="fixed" width={350} />
              </a>
            </div>
            <div className={styles.right}>
              <p>
                <span>“</span>
                <span>Parce que nous aimons notre prochain</span>
                <span>”</span>
              </p>
            </div>
          </div>
        </div>
        {/* <div className={styles.menuContainer}>
              <Link to="/" activeClassName={styles.activeLink}>Home</Link>
              <Link to="/academy" activeClassName={styles.activeLink}>Academy</Link>
              <Link to="/contact" activeClassName={styles.activeLink}>Contact</Link>
            </div> */}
      </div>
    </HeaderBG>
  </section>
)


