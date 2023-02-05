import React from 'react'
import Logo from "../../img/logo.png";

import "./Footer.scss"
const Footer = () => {
  return (
    <footer>
      <img className="logo" src={Logo} alt="blog-logo" />
      <span>Made by James Vongampai and <b>React.js / Full Stack JS</b></span>
    </footer>
  )
}

export default Footer