import * as React from "react"

const Footer = () => (
  <div id="footer-wrapper">
    <footer id="footer" class="container">
      <div class="row space-evenly">
        <div class="col-3 col-6-medium col-12-small">

          <section class="widget links">
            <h3>Random Stuff</h3>
            <ul class="style2">
              <li><a href="#">Etiam feugiat condimentum</a></li>
              <li><a href="#">Aliquam imperdiet suscipit odio</a></li>
              <li><a href="#">Sed porttitor cras in erat nec</a></li>
              <li><a href="#">Felis varius pellentesque potenti</a></li>
              <li><a href="#">Nullam scelerisque blandit leo</a></li>
            </ul>
          </section>

        </div>
       
        <div class="col-3 col-6-medium col-12-small">

          <section class="widget contact last">
            <h3>Contact Us</h3>
            <ul>
              <li><a href="#" class="icon brands fa-twitter"><span class="label">Twitter</span></a></li>
              <li><a href="#" class="icon brands fa-facebook-f"><span class="label">Facebook</span></a></li>
              <li><a href="#" class="icon brands fa-instagram"><span class="label">Instagram</span></a></li>
              <li><a href="#" class="icon brands fa-dribbble"><span class="label">Dribbble</span></a></li>
              <li><a href="#" class="icon brands fa-pinterest"><span class="label">Pinterest</span></a></li>
            </ul>
            <p>1234 Fictional Road<br />
            Nashville, TN 00000<br />
            (800) 555-0000</p>
          </section>

        </div>
      </div>
      <div class="row">
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
