import React from 'react';

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  };

  return (
    <div style={footerStyle}>
      <br />
      <em>Blog app, Software engineering, UAS Metropolia Helsinki 2022</em>
      <br />
      <em>&copy; Rasmus Hyyppä</em>
    </div>
  );
};

export default Footer;
