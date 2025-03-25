import React from "react";


const Footer = () => {    
  return (
    <div style={{
        position: 'absolute',
        width: '600px',
        background: '#1f4142',
        color: 'white',
        padding: '10px 30px',
        boxSizing: 'border-box',
        bottom: '0',
        zIndex: '-1',
        fontFamily: 'monospace',
      }}>

      <h2>A very very simple React ToDo list with API :)</h2>
      <h3>Designed by <a style={{color:'white'}} href="https://github.com/omidmousavi" target="_blank">Omid Mousavi</a></h3>
    </div>
  );
};

export default Footer;
