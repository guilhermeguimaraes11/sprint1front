import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import Footer from "../components/Footer";
import Header from "../components/Header";

const HomePage = () => {
  const styles = getStyles();

  return (
    <div style={{ backgroundColor: "#FFDCDC" }}>
      <Header />

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

      <Footer />
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
      height: "78.3vh",
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
  };
}

export default HomePage;
