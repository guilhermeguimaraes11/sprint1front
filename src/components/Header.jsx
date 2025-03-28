import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home"; 

const Header = () => {
  return (
    <header style={headerStyle}>
      <div style={logoStyle}>
        <Button 
          component={Link} 
          to="/" 
          startIcon={<HomeIcon sx={{ fontSize: 40 }} />} // Ajusta o tamanho do ícone
          sx={buttonStyle}>
          Home
        </Button>
      </div>
    </header>
  );
};

const headerStyle = {
  backgroundColor: "#D90000",
  width: "100%",
  height: "10vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end", // Alinha o botão para a direita
  borderBottom: "5px solid white",
};

const logoStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "auto",
};

const buttonStyle = {
  color: "white",
  fontWeight: "bold",
  textTransform: "none",
  marginRight: "30px", // Adiciona mais espaçamento à direita
  padding: "15px 30px", // Aumenta o tamanho do botão
  fontSize: "18px", // Aumenta o tamanho da fonte
  borderRadius: "8px", // Bordas arredondadas
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Efeito ao passar o mouse
  },
};

export default Header;
