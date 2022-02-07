import * as React from "react"

const Footer = () => (
  <div id="footer-wrapper">
    <footer id="footer" class="container">
      <div class="row space-evenly">
        <div class="col-3 col-6-medium col-12-small">

          <section class="widget links">
            <h3>Liens</h3>
            <ul class="style2">
              <li><a href="/about">A propos de nous</a></li>
              <li><a href="/activities">Nos activités</a></li>
              <li><a href="https://bullenetwork.ch" target="_blank">Bulle Network</a></li>
            </ul>
          </section>

        </div>
       
        <div class="col-3 col-6-medium col-12-small">

          <section class="widget contact last">
            <h3>Nous contacter</h3>
            <ul>
              <li><a href="https://www.instagram.com/_o2vie_/" target="_blank" class="icon brands fa-instagram"><span class="label">Instagram</span></a></li>
            </ul>
            <p>Email: fannie.blakaj@bullenetwork.ch<br/></p>
          </section>

        </div>
      </div>
      <div class="row gtr-0 gtr-uniform">
        <div class="col-12">
          <div id="copyright">
            <ul class="menu">
              <li>&copy; O2Vie {new Date().getFullYear()}</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
)

export default Footer
