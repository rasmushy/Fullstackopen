import React from "react";

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Person app, Software engineering, UAS Metropolia Helsinki 2022</em>
    </div>
  )
}

export default Footer;