import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // Certifique-se de ter o caminho correto para sua logo
import Footer from "../components/Footer"; // Certifique-se de ter o componente Footer
import Header from "../components/Header"; // Certifique-se de ter o componente Header

const HomePage = () => {
  const styles = {
    container: {
      backgroundColor: "#FCE4EC", // Um tom de rosa claro
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh", // Garante que a tela toda seja coberta
    },
    content: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      padding: "2rem",
      borderRadius: "8px",
    },
    logo: {
      width: "300px", // Ajuste conforme necessário
      height: "auto",
      marginBottom: "2rem",
    },
    title: {
      fontWeight: "bold",
      fontSize: "2.5rem",
      color: "#333",
      marginBottom: "1.5rem",
    },
    button: {
      marginTop: "1rem",
      padding: "0.75rem 2rem",
      borderRadius: "5px",
      fontSize: "1rem",
      fontWeight: "bold",
      minWidth: "150px",
    },
    loginButton: {
      backgroundColor: "#B71C1C", // Vermelho escuro
      color: "#fff",
      "&:hover": {
        backgroundColor: "#D32F2F", // Tom mais claro no hover
      },
    },
    cadastroButton: {
      border: "2px solid #B71C1C", // Vermelho escuro
      color: "#B71C1C",
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: "rgba(183, 28, 28, 0.1)", // Leve tom no hover
      },
    },
  };

  return (
    <Box sx={{ backgroundColor: "#FCE4EC", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Container component="main" sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box sx={styles.content}>
          <Box component="img" src={logo} alt="Logo SENAI" sx={styles.logo} />
          <Typography variant="h4" sx={styles.title}>
            Bem-vindo ao Sistema SENAI
          </Typography>
          <Button
            component={Link}
            to="/login"
            sx={{ ...styles.button, ...styles.loginButton }}
            variant="contained"
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/cadastro"
            sx={{ ...styles.button, ...styles.cadastroButton }}
            variant="outlined"
          >
            Cadastre-se
          </Button>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default HomePage;