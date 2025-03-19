import React from "react";
import home from "../../img/iconehome.png";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const Header = () => {
  return (
    <header style={headerStyle}>
      <div style={logoStyle}>
        <Button component={Link} to="/">
        <img src={home} alt="Home" style={{ width: "65px", height: "65px" }} />
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
  justifyContent: "end",
  borderBottom: "5px solid white",
};
const logoStyle = {
  width: "200px",
  height: "auto",
  mb: 4,
};

export default Header;
