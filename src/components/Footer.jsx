import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      &copy; Desenvolvido por: Leonardo Pedroso, Guilherme Guimarães e Hyago
    </footer>
  );
};


const footerStyle = {
    mt: 10,
      backgroundColor: "#D90000",
      width: "100%",
      height: "10vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderTop: "5px solid white",
    };
    

export default Footer;
