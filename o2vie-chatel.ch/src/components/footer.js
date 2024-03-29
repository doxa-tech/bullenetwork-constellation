import * as React from "react"

const Footer = () => {
  const version = process.env.GATSBY_APP_VERSION || "v0.0.0"
  const buildURL = process.env.GATSBY_BUILD_URL || "#"
  const shortSHA = process.env.GATSBY_SHORT_SHA || "xxx"
  const buildDate = process.env.GATSBY_BUILD_DATE || "1.1.1970"

  return (
    <div id="footer-wrapper">
      <footer id="footer" className="container">
        <div className="row space-evenly">
          <div className="col-3 col-6-medium col-12-small">

            <section className="widget links">
              <h3>Liens</h3>
              <ul className="style2">
                <li><a href="/about">A propos de nous</a></li>
                <li><a href="/activities">Nos activités</a></li>
                <li><a href="https://bullenetwork.ch" target="_blank" rel="noreferrer">Bulle Network</a></li>
              </ul>
            </section>

          </div>

          <div className="col-3 col-6-medium col-12-small">

            <section className="widget links">
              <h3>CCP</h3>
              <ul className="style2">
                <li>Bulle Network, O2Vie, Bulle</li>
                <li>IBAN CH96 0900 0000 1581 1462 6</li>

              </ul>
            </section>

          </div>

          <div className="col-3 col-6-medium col-12-small">

            <section className="widget contact last">
              <h3>Nous contacter</h3>
              <ul>
                <li><a href="https://www.instagram.com/_o2vie_/" target="_blank" rel="noreferrer" className="icon brands fa-instagram"><span className="label">Instagram</span></a></li>
              </ul>
              <p>Email: fannie.blakaj@bullenetwork.ch<br /></p>
            </section>

          </div>
        </div>
        <div className="row gtr-0 gtr-uniform">
          <div className="col-12">
            <div id="copyright">
              <ul className="menu">
                <li>&copy; O2Vie {new Date().getFullYear()}</li>
                <li className="version"><a href={`https://github.com/doxa-tech/bullenetwork-constellation/releases/tag/${version}`} target="_blank">{version}</a> - <a href={buildURL} target="_blank">{shortSHA}</a> - ({buildDate})</li>
                <li>Design: <a href="http://html5up.net" target="_blank" rel="noreferrer">HTML5 UP</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
