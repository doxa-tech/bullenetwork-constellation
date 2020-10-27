import React from "react"
import { graphql } from "gatsby"
import { RiSendPlane2Line } from "react-icons/ri";

import Layout from "../components/layout"

const Contact = () => {

  return (
    <Layout className="contact-page">
      <div className="wrapper">
        <h1>Contact</h1>
        <div className="description">
          Des questions ? N'hésitez pas à nous contacter.
        </div>
        <form className="contact-form" action="https://formspree.io/f/xyybkanw" name="contact" method="POST">
          <input type="hidden" name="form-name" value="contact" />
          <p>
            <label>Nom<input type="text" name="name" /></label>
          </p>
          <p>
            <label>Email<input type="email" name="email" /></label>
          </p>
          <p>
            <label>Message<textarea name="message"></textarea></label>
          </p>
          <p className="text-align-right">
            <button className="button" type="submit">Send Message <span className="icon -right"><RiSendPlane2Line /></span></button>
          </p>
        </form>
      </div>

    </Layout>
  )
}

export default Contact