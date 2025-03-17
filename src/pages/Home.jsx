import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import home from "../../img/iconehome.png";
import logo from "../../img/logo.png";

const HomePage = () => {
  const styles = getStyles();

  return (
    <div style={{ backgroundColor: "#FFDCDC"}} >
      <Box sx={styles.header}>
        <Button component={Link} to="/home" sx={styles.buttonHome}>
          <img
            src={home}
            alt="Home"
            style={{ width: "65px", height: "65px" }}
          />
        </Button>
      </Box>

      <Container component="main" sx={styles.container}>
        <Box sx={styles.content}>
          <Box component="img" src={logo} alt="Logo" sx={styles.logo} />
          <Typography variant="h4" sx={styles.title}>
            Bem-vindo ao Sistema SENAI
          </Typography>
          <Button
            component={Link}
            to="/login"
            sx={styles.button}
            variant="contained"
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/cadastro"
            sx={styles.button}
            variant="outlined"
          >
            Cadastre-se
          </Button>
        </Box>
        
      </Container>

      <Box sx={styles.footer}>
          <Typography sx={styles.footerText}>
            &copy; Desenvolvido por: Leonardo Pedroso, Guilherme Guimarães e
            Hyago
          </Typography>
        </Box>

    </div>
  );
};

function getStyles() {
  return {
    container: {
      backgroundColor: "#FFDCDC",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "78.6vh",
     
    },
    header: {
      backgroundColor: "#D90000",
      width: "100%",
      height: "10vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "end",
      borderBottom: "5px solid white",
    },
    buttonHome: {
      mr: 2,    
    },
    content: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      mt: 8,
    },
    logo: {
      width: "250px",
      height: "auto",
      mb: 4,
    },
    title: {
      fontWeight: "bold",
      mb: 3,
    },
    button: {
      mt: 2,
      width: "200px",
      backgroundColor: "rgba(177, 16, 16, 1)",
      color: "white",
    },
    footer: {
      mt: "auto",
      backgroundColor: "#D90000",
      width: "100%",
      height: "10vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderTop: "5px solid white",
    },
    footerText: {
      color: "white",
      fontSize: 16,
    },
  };
}

export default HomePage;
